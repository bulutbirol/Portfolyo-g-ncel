<?php
// Logs visits and CV downloads, mails a notification. Stats: GET /api/track.php?key=<key>.
// Server-only config (not in repo): api/track.config.php -> <?php return ['notify' => 'you@example.com', 'key' => 'long-random-string'];
// shortcut: flat file log + full scan for dedupe, fine for portfolio traffic; move to SQLite past ~100k lines.

header('Content-Type: application/json');
ini_set('display_errors', '0');
$cfg = is_file(__DIR__ . '/track.config.php') ? require __DIR__ . '/track.config.php' : [];
$logFile = __DIR__ . '/track.log';

// Public on purpose: only anonymous counts, shown on /admin.
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    date_default_timezone_set('Europe/Istanbul');
    $total = ['visit' => 0, 'cv' => 0];
    $days = [];
    foreach (is_file($logFile) ? file($logFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) : [] as $line) {
        $r = json_decode($line, true);
        $e = $r['e'] ?? '';
        if (!isset($total[$e])) continue;
        $total[$e]++;
        $d = date('Y-m-d', (int)($r['t'] ?? 0));
        $days[$d][$e] = ($days[$d][$e] ?? 0) + 1;
    }
    $out = [];
    for ($i = 29; $i >= 0; $i--) {
        $d = date('Y-m-d', strtotime("-$i day"));
        $out[$d] = ['visit' => $days[$d]['visit'] ?? 0, 'cv' => $days[$d]['cv'] ?? 0];
    }
    header('Cache-Control: no-store');
    echo json_encode(['visits' => $total['visit'], 'cv' => $total['cv'], 'days' => $out]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); exit('{}'); }

$ua = $_SERVER['HTTP_USER_AGENT'] ?? '';
if ($ua === '' || preg_match('/bot|crawl|spider|slurp|curl|wget|preview|headless|lighthouse/i', $ua)) exit('{}');

$body = json_decode(file_get_contents('php://input'), true);
$event = $body['e'] ?? '';
if (!in_array($event, ['visit', 'cv'], true)) { http_response_code(400); exit('{}'); }

// Stores only time + event type: no IP, UA, referrer, language or country. UA is read just to skip bots.
// Mail is throttled globally (visit: 30 min, cv: 1 min) instead of per person, since nobody is identified.
$now = time();
$window = $event === 'cv' ? 60 : 1800;

$notify = true;
if (is_file($logFile)) {
    foreach (array_reverse(file($logFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES)) as $line) {
        $r = json_decode($line, true);
        if (($r['t'] ?? 0) < $now - $window) break;
        if (($r['e'] ?? '') === $event && !empty($r['n'])) { $notify = false; break; }
    }
}

$entry = ['t' => $now, 'e' => $event] + ($notify ? ['n' => 1] : []);
file_put_contents($logFile, json_encode($entry) . "
", FILE_APPEND | LOCK_EX);

// Reuses the contact form's SMTP settings (api/config.php + api/phpmailer): mail() is not usable on this host.
if ($notify && !empty($cfg['notify']) && is_file(__DIR__ . '/config.php')) {
    $smtp = require __DIR__ . '/config.php';
    try {
        foreach (['Exception', 'PHPMailer', 'SMTP'] as $f) require_once __DIR__ . "/phpmailer/src/$f.php";
        $mail = new PHPMailer\PHPMailer\PHPMailer(true);
        $mail->isSMTP();
        $mail->Host = (string)$smtp['smtp_host'];
        $mail->SMTPAuth = true;
        $mail->Username = (string)$smtp['smtp_user'];
        $mail->Password = (string)$smtp['smtp_pass'];
        $mail->SMTPSecure = PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port = (int)$smtp['smtp_port'];
        $mail->CharSet = 'UTF-8';
        $mail->setFrom((string)$smtp['smtp_user'], 'birolweb.dev');
        $mail->addAddress($cfg['notify']);
        $mail->Subject = $event === 'cv' ? 'CV indirildi' : 'Siteye yeni ziyaret';
        $mail->Body = date('d.m.Y H:i', $now);
        $mail->send();
    } catch (Throwable $e) {
        error_log('track mail failed: ' . $e->getMessage());
    }
}
echo '{}';
