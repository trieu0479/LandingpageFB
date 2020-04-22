
    <? require_once(__DIR__."/modules/mission.header.php")?>
  <div class="text-center pt-3 pb-3">
        <div class="fontSize-18 font-weight-bold text-success">Yêu Cầu Like Post</div>
        <div class="fontSize-14 font-weight-bold">Bạn cần Like vào <a class="text-info" target="blank" href="https://facebook.com/<?=$kq['missionFbId']?>">bài viết này</a> sau đó bấm mở khóa link</div>
    </div>
    <main class="maxWidth-1180 m-auto pb-5" role="main">

        <div id="fbIframe" class="text-center fbIframe pl-3 pr-3">
                <div class="fb-post" data-href="<?=$kq['missionFbUrl']?>" data-show-text="true" data-width=""></div>
        </div>

        <? if (@$_GET['error']){?>
          <div class="alert alert-secondary mt-4" role="alert">
							<div class="alert-icon"><i class="fontSize-32 text-danger fal fa-exclamation-triangle"></i></div>
						  	<div class="alert-text">
                  Bạn cần hoàn tất nhiệm vụ lIKE vào  <a class="text-info" target="blank" href="<?=$kq['missionFbUrl']?>">bài viết này</a> để mở khóa link.<br>
                  Vui lòng thực hiện nhiệm vụ và bấm nút hoàn tất nhé
							</div>
						</div>
        <?}?>
        <div class="finishMission mt-3 text-center">
            <button class="btn btn-info btn-wide confirmMission" data-mission="<?=$kq['missionType']?>" data-missionid="<?=$kq['missionFbId']?>" data-alias="<?=$kq['alias']?>">TÔI ĐÃ LIKE - MỞ KHÓA </button>
        </div>

     
    </main>

    <script> var alias = '<?=$kq['alias']?>';</script>
    <script src="<?=$rootURL?>/dist/js/pages/mission.js"></script>

    <? require_once(__DIR__."/modules/footer.php")?>