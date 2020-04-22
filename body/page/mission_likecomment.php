

<!doctype html>
<html lang="en">
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

  <div class="text-center pt-3 pb-3">
        <div class="fontSize-18 font-weight-bold text-success">Yêu Cầu Like & Comment</div>
        <div class="fontSize-14 font-weight-bold">Bạn cần Like và Comment vào <a class="text-info" target="blank" href="https://facebook.com/<?=$kq['missionFbId']?>">bài viết này</a> sau đó bấm mở khóa link</div>
    </div>
    <main class="maxWidth-1180 m-auto" role="main">

        <div class="text-center pl-3 pr-3">
                <div class="fb-post" data-href="<?=$kq['missionFbUrl']?>" data-show-text="true" data-width=""></div>
        </div>

        <? if (@$_GET['error']){?>
          <div class="alert alert-secondary mt-4" role="alert">
							<div class="alert-icon"><i class="fontSize-32 text-danger fal fa-exclamation-triangle"></i></div>
						  	<div class="alert-text">
                  Bạn cần hoàn tất nhiệm vụ lIKE và Comment vào  <a class="text-info" target="blank" href="<?=$kq['missionFbUrl']?>">bài viết này</a> để mở khóa link.<br>
                  Vui lòng thực hiện nhiệm vụ và bấm nút hoàn tất nhé
							</div>
						</div>
        <?}?>
        <div class="finishMission mt-3 text-center">
            <a href="<?=$rootURL?>/unlock/<?=$view?>"><button class="btn btn-info btn-wide">TÔI ĐÃ LIKE & COMMENT </button></a>
        </div>

     
    </main>

    <div id="fb-root"></div>
    <script async defer crossorigin="anonymous" src="https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v6.0&appId=<?=$appId?>&autoLogAppEvents=1"></script>

    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="<?=$rootURL?>/dist/js/bootstrap.min.js"></script>
    <script src="<?=$rootURL?>/dist/js/pages/log.js"></script>
  </body>
</html>
