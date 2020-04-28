

<!doctype html>
<html lang="vi">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="Truy cập, mở khóa và nhận nhiều phần thưởng giá trị">
    <meta name="author" content="fffblue">
    <title>Mở khóa và tương tác link</title>
    <link rel="apple-touch-icon-precomposed" sizes="57x57" href="<?=$rootURL?>/dist/images/icon/apple-touch-icon-57x57.png" />
<link rel="apple-touch-icon-precomposed" sizes="114x114" href="<?=$rootURL?>/dist/images/icon/apple-touch-icon-114x114.png" />
<link rel="apple-touch-icon-precomposed" sizes="72x72" href="<?=$rootURL?>/dist/images/icon/apple-touch-icon-72x72.png" />
<link rel="apple-touch-icon-precomposed" sizes="144x144" href="<?=$rootURL?>/dist/images/icon/apple-touch-icon-144x144.png" />
<link rel="apple-touch-icon-precomposed" sizes="60x60" href="<?=$rootURL?>/dist/images/icon/apple-touch-icon-60x60.png" />
<link rel="apple-touch-icon-precomposed" sizes="120x120" href="<?=$rootURL?>/dist/images/icon/apple-touch-icon-120x120.png" />
<link rel="apple-touch-icon-precomposed" sizes="76x76" href="<?=$rootURL?>/dist/images/icon/apple-touch-icon-76x76.png" />
<link rel="apple-touch-icon-precomposed" sizes="152x152" href="<?=$rootURL?>/dist/images/icon/apple-touch-icon-152x152.png" />
<link rel="icon" type="image/png" href="<?=$rootURL?>/dist/images/icon/favicon-196x196.png" sizes="196x196" />
<link rel="icon" type="image/png" href="<?=$rootURL?>/dist/images/icon/favicon-96x96.png" sizes="96x96" />
<link rel="icon" type="image/png" href="<?=$rootURL?>/dist/images/icon/favicon-32x32.png" sizes="32x32" />
<link rel="icon" type="image/png" href="<?=$rootURL?>/dist/images/icon/favicon-16x16.png" sizes="16x16" />
<link rel="icon" type="image/png" href="<?=$rootURL?>/dist/images/icon/favicon-128.png" sizes="128x128" />
<meta name="application-name" content="&nbsp;"/>
<meta name="msapplication-TileColor" content="#FFFFFF" />
<meta name="msapplication-TileImage" content="<?=$rootURL?>/dist/images/icon/mstile-144x144.png" />
<meta name="msapplication-square70x70logo" content="<?=$rootURL?>/dist/images/icon/mstile-70x70.png" />
<meta name="msapplication-square150x150logo" content="<?=$rootURL?>/dist/images/icon/mstile-150x150.png" />
<meta name="msapplication-wide310x150logo" content="<?=$rootURL?>/dist/images/icon/mstile-310x150.png" />
<meta name="msapplication-square310x310logo" content="<?=$rootURL?>/dist/images/icon/mstile-310x310.png" />


    <link rel="canonical" href="<?=$rootURL?>/<?=$view?>">

    <!-- Bootstrap core CSS -->
    <link href="<?=$rootURL?>/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="<?=$rootURL?>/dist/css/pages/mission.css" rel="stylesheet">
    <link href="<?=$rootURL?>/dist/css/pages/stepper.css" rel="stylesheet">
    <link href="<?=$rootURL?>/dist/css/fff/reset.css" rel="stylesheet">

    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MFS4FQC');</script>

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
    <? if ($kq['pixelsCode']){?>
     <!-- Facebook Pixel Code -->
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', '<?=$kq['pixelsCode']?>');
  fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
  src="https://www.facebook.com/tr?id=<?=$kq['pixelsCode']?>&ev=PageView&noscript=1"
/></noscript>
<!-- End Facebook Pixel Code -->
    <?}?>
    <script> var alias = '<?=$view?>';</script>


  </head>

  <body>