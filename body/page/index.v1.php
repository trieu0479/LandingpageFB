<?php 
$meta['title'] = "Công cụ tăng tương tác facebook - fff.blue";
$meta['description'] = "Tăng tương tác Like, Comment thật. Dùng cho cả profile cá nhân, fanpage và group. Nói không với tương tác ảo";
$meta['image'] = "https://fff.blue/dist/images/step-11.jpg";

require_once(__DIR__."/modules/header.php");
require_once(__DIR__."/modules/topmenu.php");

?>

    <div class="text-center pb-5 pt-7 pt-md-5">
        <div class="fontSize-16 font-weight-bold text-success">FFF BLUE</div>
        <div class="fontSize-24 font-weight-bold text-primary">Công Cụ Tăng Tương Tác Facebook</div>
        <div class="fontSize-14 text-muted mb-2">Tạo khóa link, yêu cầu người dùng tương tác (Like và Comment) vào post trên Facebook để mở khóa </div>        
    </div>
    <div class="maxWidth-800 pb-5 m-auto mrl-md-1">

        <div class="text-left"><a target="blank"  class="text-box-catelog text-white bg-001" href="https://help.fff.com.vn/cong-cu-facebook/tang-tuong-tac-facebook">Xem hướng dẫn</a></div>
            <div class="input-group">
                    <select class="form-control border-tr-br-radius-0 fontSize-14 wantToDo">
                        <option value="LIKECOMMENT-PROFILE">Tăng Like & Comment Post trên Profile Facebook</option>
                        <option value="LIKECOMMENT-FANPAGE">Tăng Like & Comment Post trên Fanpage Facebook</option>
                        <option value="LIKECOMMENT-GROUP">Tăng Like & Comment Post trên Group Facebook</option>
                        <option value="LIKEFANPAGE">Tăng Like Facebook Fanpage</option>
                        <option value="JOINGROUP">Tăng Member Facebook Group</option>
                    </select>
                
                <div class="input-group-append">
                    <button class="ml-auto  btn-Step1 btn btn-info"><i class="fad fa-layer-plus mr-2"></i> Tiếp tục</button>
                </div>
            </div>

            
        </div>
    </div>
 
    <? if ($userToken != $demoToken){?>
    <div class="homepageMission maxWidth-1080  m-auto">
        <div>
            <ul class="nav customTabColor">
                <li class="nav-item">
                    <a  class="nav-link active" data-toggle="tab" data-value="listMyMission" href="#listMyMission">Nhiệm vụ</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link listMyAllData" data-toggle="tab" data-value="listMyAllData" href="#listMyAllData">Data khách hàng</a>
                </li>
                <li class="nav-item ml-auto">
                    <a class="nav-link donwloadData btn-sm mt-2 text-box-catelog text-white bg-001" data-toggle="tab" data-value="donwloadData" href="#donwloadData">Download</a>
                </li>
            </ul>
        </div>

        <table id="myLockUrl" class="table ">
        </table>
    </div>
    <?}else{?>

    <div class="homepageMission maxWidth-1080 pt-5 m-auto pt-md-2">
        <h2 class="pt-2 pb-2 text-gray text-center fontSize-24 md-FontSize20">Hệ Thống Hoạt Động Ra Sao</h2>
        <div class="text-center video-container "><iframe src="https://www.youtube.com/embed/a7tibZnx0Cg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
        
        
        <div class="stepper pt-5 pt-md-0rem">
            <div class="step_item">
                <i class="fad fa-bullseye-pointer text-danger"></i>
                <div class="step_header text-info mt-2">(1) Tương tác</div>
                <div class="step_des pb-2">Yêu cầu người dùng tương tác vào bài viết, gồm cả Like và Comment</div>
                <div class="step_img d-none d-sm-block"><img src="<?=$rootURL?>/dist/images/step-1.png"></div>
            </div>
            <div class="step_item">
                <i class="fad fa-radar text-danger"></i>
                <div class="step_header text-info mt-2">(2) Xác nhận</div>
                <div class="step_des pb-2">Yêu cầu login facebook để xác nhận bạn đã tương tác</div>
                <div class="step_img d-none d-sm-block"><img src="<?=$rootURL?>/dist/images/step-2.jpg"></div>
            </div>
            <div class="step_item">
                <i class="fad fa-lock-open-alt text-danger"></i>
                <div class="step_header text-info mt-2">(3) Mở khóa</div>
                <div class="step_des pb-2">Kiểm tra tài khoản vừa xác nhận và tương tác để mở khóa</div>
                <div class="step_img d-none d-sm-block"><img src="<?=$rootURL?>/dist/images/step-3.jpg"></div>
            </div>
        </div>
    </div>
    <?}?>
    <script src="<?=$rootURL?>/dist/js/pages/index.v1.js?v=<?=$version?>"></script>
    <script src="<?=$rootURL?>/dist/js/default/header.js?v=<?=$version?>"></script>

 <? require_once(__DIR__."/modules/footer.php")?>