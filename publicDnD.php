<?php
// Load other apps for file previews
OC_App::loadApps();
if (isset($_GET['file_id']) && isset($_GET['user_id'])) {
    $userId = $_GET['user_id'];
    OC_Util::tearDownFS();
    OC_Util::setupFS($userId);
    $path = \OC\Files\Filesystem::getPath($_GET['file_id']);
    if (isset($path)) {
        $dir = dirname($path);
        $file = basename($path);
        OC_Files::get($dir, $file, $_SERVER['REQUEST_METHOD'] == 'HEAD' ? true : false);
        exit();
    }
}
header('HTTP/1.0 404 Not Found');
$tmpl = new OCP\Template('', '404', 'guest');
$tmpl->printPage();
