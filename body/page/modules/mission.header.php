

<!doctype html>
<html lang="vi">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="Truy cập, mở khóa và nhận nhiều phần thưởng giá trị">
    <meta name="author" content="fffblue">
    <title>Mở khóa và tương tác link</title>

    <link rel="canonical" href="<?=$rootURL?>/<?=$view?>">

    <!-- Bootstrap core CSS -->
    <link href="<?=$rootURL?>/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="<?=$rootURL?>/dist/css/pages/mission.css" rel="stylesheet">
    <link href="<?=$rootURL?>/dist/css/pages/stepper.css" rel="stylesheet">
    <link href="<?=$rootURL?>/dist/css/fff/reset.css" rel="stylesheet">
    <? if ($kq['analyticCode']){?>
      <script async src="https://www.googletagmanager.com/gtag/js?id=<?=$kq['analyticCode']?>"></script>
      <script>
        var alias = '<?=$view?>';
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', '<?=$kq['analyticCode']?>');
      </script>
    <?}?>
    <script> var alias = '<?=$view?>';</script>
  </head>

  <body>