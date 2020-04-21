

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

    <div class="text-center pb-5 pt-5">
        <div class="fontSize-16 font-weight-bold text-success">Mở Khóa Link 😍</div>
        <div class="fontSize-24 font-weight-bold text-primary">Hoàn thành nhiệm vụ để mở khóa</div>
        <hr width="25%">
    </div>
    <main class="maxWidth-1180 m-auto" role="main">

        <div class="stepper">
            <div class="step_item">
                <i class="fad fa-bullseye-pointer text-danger"></i>
                <div class="step_header text-info mt-2">(1) Tương tác</div>
                <div class="step_des pb-2">Thực hiện Like và comment vào <a class="text-info" target="blank" href="https://facebook.com/<?=$kq['missionFbId']?>">bài viết này</a></div>
                <div class="step_img d-none d-sm-block"><img src="<?=$rootURL?>/dist/images/step-1.png"></div>
            </div>
            <div class="step_item">
                <i class="fad fa-radar text-danger"></i>
                <div class="step_header text-info mt-2">(2) Xác nhận</div>
                <div class="step_des pb-2">Yêu cầu bạn login facebook để xác nhận</div>
                <div class="step_img d-none d-sm-block"><img src="<?=$rootURL?>/dist/images/step-2.jpg"></div>
            </div>
            <div class="step_item">
                <i class="fad fa-lock-open-alt text-danger"></i>
                <div class="step_header text-info mt-2">(3) Mở khóa</div>
                <div class="step_des pb-2">Mở khóa tài liệu và tận tưởng</div>
                <div class="step_img d-none d-sm-block"><img src="<?=$rootURL?>/dist/images/step-3.jpg"></div>
            </div>
        </div>

        <? if (@$_GET['error']){?>
          <div class="alert alert-secondary mt-4" role="alert">
							<div class="alert-icon"><i class="fontSize-32 text-danger fal fa-exclamation-triangle"></i></div>
						  	<div class="alert-text">
                  Bạn cần hoàn tất nhiệm vụ (Like & Comment) vào  <a class="text-info" target="blank" href="<?=$kq['missionFbUrl']?>">bài viết này</a> để mở khóa link.<br>
                  Vui lòng thực hiện nhiệm vụ và bấm nút hoàn tất nhé
							</div>
						</div>
        <?}?>
        <div class="finishMission pt-5 text-center">
            <a href="<?=$rootURL?>/unlock/<?=$view?>"><button class="btn btn-info btn-wide">ĐÃ HOÀN TẤT NHIỆM VỤ</button></a>
        </div>

     
    </main>



    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="<?=$rootURL?>/dist/js/bootstrap.min.js"></script>
    <script src="<?=$rootURL?>/dist/js/pages/log.js"></script>
  </body>
</html>
