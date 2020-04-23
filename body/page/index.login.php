<?php 
$meta['title'] = "Công cụ tăng tương tác facebook - fff.blue";
$meta['description'] = "Tăng tương tác Like, Comment thật. Dùng cho cả profile cá nhân, fanpage và group. Nói không với tương tác ảo";
$meta['image'] = "https://fff.blue/dist/images/step-11.jpg";

require_once(__DIR__."/modules/header.php");
require_once(__DIR__."/modules/topmenu.php");

?>

    <div class="text-center pb-5 pt-7">
        <div class="fontSize-16 font-weight-bold text-success">FFF BLUE</div>
        <div class="fontSize-24 font-weight-bold text-primary">Công Cụ Tăng Tương Tác Facebook</div>
        <div class="fontSize-14 text-muted mb-2">Tạo khóa link, yêu cầu người dùng tương tác (Like và Comment) vào post trên Facebook để mở khóa </div>        
    </div>
    <div class="maxWidth-800 pb-5 m-auto">
        <div class="text-center clearfix">
            <div class="form-group">
                 <div class="text-left"><a target="blank"  class="text-box-catelog text-white bg-001" href="https://help.fff.com.vn/cong-cu-facebook/tang-tuong-tac-facebook">Xem hướng dẫn</a></div>
                 <div class="d-flex">
                 <select class="custom-select" id="listSelectInteractive">
                        <option selected value="">Chọn tương tác</option>
                        <option value="likePost">Tăng Like 👍 bài post</option>
                        <option value="Like&Comment">Tăng Like 👍 và Comment bài post</option>
                        <option value="likePage">Tăng Like 👍 page</option>
                        <option value="joinInGroup">Tăng Member Group</option>
                    </select>
                    <button class="ml-6px btn-lockOption btn btn-info"><i class="fad fa-layer-plus mr-2"></i> Cấu Hình</button>
                </div>
            </div>
            <!-- <div class="form-group">
            <div class="d-flex no-block">
                <div class="text-left d-flex no-block align-self-center">
                    <div class="font-gg font-weight-500 font-16 text-muted d-none d-md-block">
                        Tăng Tương Tác:
                    </div>
                    <div class="ml-0 ml-md-5 custom-control custom-checkbox">
                        <input type="checkbox" class="custom-control-input  input-requestLike" name="check-requestLike" checked>
                        <label class="custom-control-label cursor-pointer"><i class="font-14 mr-2 fad fa-thumbs-up"></i>Tăng Like</label>
                    </div>
                    <div class="ml-3 ml-md-5 custom-control custom-checkbox">
                        <input type="checkbox" class="custom-control-input  input-requestComment" id="check-requestComment" checked name="check-option">
                        <label class="custom-control-label" for="check-requestComment"><i class="font-20 mr-2 fad fa-comments"></i>Tăng Comment</label>
                    </div>
                </div>
              

                        <button class="ml-auto  btn-lockURL btn btn-info"><i class="fad fa-layer-plus mr-2"></i> Cấu Hình</button>
            </div> -->
            </div>
        </div>
    </div>
 
    <div class="homepageMission maxWidth-1080  m-auto">
        <table id="myLockUrl" class="table ">
        </table>
    </div>

    <script src="<?=$rootURL?>/dist/js/pages/index.js?v=<?=$version?>"></script>
    <script src="<?=$rootURL?>/dist/js/default/header.js?v=<?=$version?>"></script>
    <script src="<?=$rootURL?>/dist/js/extension/datatables.min.js"></script>
    <script src="<?=$rootURL?>/dist/js/extension/dataTables.buttons.min.js"></script>
    
    <script src="<?=$rootURL?>/dist/js/pages/index.login.js?v=<?=$version?>"></script>

 <? require_once(__DIR__."/modules/footer.php")?>