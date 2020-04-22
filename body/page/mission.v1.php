
    <? 
    require_once(__DIR__."/modules/mission.header.php");
    switch($kq['missionType']){
        case "LIKE":
            $meta['title'] = "Bạn cần Like bài viết để mở khóa";
            $meta['h1'] = "Cần Like Post";
            $meta['des'] = 'Bạn cần Like vào <a class="text-info" target="blank" href="https://facebook.com/'.['missionFbId'].'">bài viết này</a> sau đó bấm mở khóa link';
            if ($kq['fbLinkFrom'] != "GROUP"){
                $meta['fbEmbed'] = '<div class="fb-post" data-href="'.$kq['missionFbUrl'].'" data-show-text="true" data-width=""></div>';
            }else{
                $meta['fbEmbed'] = '<div class="step_img pt-2 pb-2 d-none d-sm-block"><img src="'.$rootURL.'/dist/images/step-1.png"></div>';
            }
            $meta['btn'] = "Đã Like - Mở Khóa";
            break;
        case "LIKEPOST":
            $meta['title'] = "Bạn cần Like bài viết để mở khóa";
            $meta['h1'] = "Cần Like Post";
            $meta['des'] = 'Bạn cần Like vào <a class="text-info" target="blank" href="https://facebook.com/'.['missionFbId'].'">bài viết này</a> sau đó bấm mở khóa link';
            if ($kq['fbLinkFrom'] != "GROUP"){
                $meta['fbEmbed'] = '<div class="fb-post" data-href="'.$kq['missionFbUrl'].'" data-show-text="true" data-width=""></div>';
            }else{
                $meta['fbEmbed'] = '<div class="step_img pt-2 pb-2 d-none d-sm-block"><img src="'.$rootURL.'/dist/images/step-1.png"></div>';
            }
            $meta['btn'] = "Đã Like - Mở Khóa";
            break;
        case "LIKECOMMENT":
        case "COMMENT":
            $meta['title'] = "Bạn cần Like bài viết để mở khóa";
            $meta['h1'] = "Cần Like & Comment Post";
            $meta['des'] = 'Bạn cần Like & Comment vào <a class="text-info" target="blank" href="https://facebook.com/'.['missionFbId'].'">bài viết này</a> sau đó bấm mở khóa link';
            if ($kq['fbLinkFrom'] != "GROUP"){
                $meta['fbEmbed'] = '<div class="fb-post" data-href="'.$kq['missionFbUrl'].'" data-show-text="true" data-width=""></div>';
            }else{
                $meta['fbEmbed'] = '<div class="step_img pt-2 pb-2 d-none d-sm-block"><img src="'.$rootURL.'/dist/images/step-1.png"></div>';
            }
            $meta['btn'] = "Đã Like & Comment - Mở Khóa";
            break;   
        case "LIKEPAGE":
            $meta['title'] = "Bạn cần Like Fanpage để mở khóa";
            $meta['h1'] = "Cần Like Fanpage";
            $meta['des'] = 'Bạn cần Like (thích) <a class="text-info" target="blank" href="https://facebook.com/'.['missionFbId'].'">fanpage này</a> sau đó bấm mở khóa link';
            $meta['fbEmbed'] = '<div class="fb-page" data-href="https://www.facebook.com/'.$kq['missionFbId'].'/"  data-tabs="timeline"  data-width="" data-height="360" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true"></div>
            ';
            $meta['btn'] = "Đã Like Fanpage - Mở Khóa";
            break;      
        case "JOINGROUP":
            $meta['title'] = "Bạn cần Join Vào Group để mở khóa";
            $meta['h1'] = "Cần Join Group";
            $meta['des'] = 'Bạn cần tham gia <a class="text-info" target="blank" href="https://facebook.com/'.['missionFbId'].'">nhóm này</a> sau đó bấm mở khóa link';
            $meta['fbEmbed'] = '<div class="fb-group" data-href="https://www.facebook.com/groups/'.$kq['missionFbId'].'/" data-width="360" data-show-social-context="true" data-show-metadata="false"></div>';
            $meta['btn'] = "Đã Tham Gia Nhóm";
            break;      
                                    
    }
    
    ?>
  <div class="text-center pt-3 pb-3">
        <div class="fontSize-18 font-weight-bold text-success"><?=$meta['h1']?></div>
        <div class="fontSize-14 font-weight-bold"><?=$meta['des']?></div>
    </div>
    <main class="maxWidth-1180 m-auto pb-5" role="main">

        <div id="fbIframe" class="text-center fbIframe pl-3 pr-3">
            <?=$meta['fbEmbed']?>
        </div>
        <div class="finishMission mt-3 text-center">
            <button class="btn btn-info btn-wide confirmMission" data-mission="<?=$kq['missionType']?>" data-missionid="<?=$kq['missionFbId']?>" data-alias="<?=$kq['alias']?>"><?=$meta['btn']?></button>
        </div>

     
    </main>

    <script> var alias = '<?=$kq['alias']?>';</script>
    <script src="<?=$rootURL?>/dist/js/pages/mission.js"></script>

    <? require_once(__DIR__."/modules/footer.php")?>