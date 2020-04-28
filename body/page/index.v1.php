<?php
$meta['title'] = "Công cụ tăng tương tác facebook - fff.blue";
$meta['description'] = "Tăng tương tác Like, Comment thật. Dùng cho cả profile cá nhân, fanpage và group. Nói không với tương tác ảo";
$meta['image'] = "https://fff.blue/dist/images/step-11.jpg";

require_once(__DIR__ . "/modules/header.php");
require_once(__DIR__ . "/modules/topmenu.php");

?>

<div class="text-center pb-5 pt-7 pt-md-5">
    <div class="fontSize-16 font-weight-bold text-success">FFF BLUE</div>
    <div class="fontSize-24 font-weight-bold text-primary">Công Cụ Tăng Tương Tác Facebook</div>
    <div class="fontSize-14 text-muted mb-2">Tạo khóa link, yêu cầu người dùng tương tác (Like và Comment) vào post trên Facebook để mở khóa </div>
</div>
<div class="maxWidth-800 pb-5 m-auto mrl-md-1">

    <div class="text-left"><a target="blank" class="text-box-catelog text-white bg-001" href="https://help.fff.com.vn/cong-cu-facebook/tang-tuong-tac-facebook">Xem hướng dẫn</a></div>
    <div class="input-group" id="input-group">
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

<? if ($userToken != $demoToken) { ?>
    <div class="homepageMission maxWidth-1080  m-auto">
        <div class="bg-white shadow-sm rounded">
            <!-- <div class="row m-0 pt-2 mb-2">
                <div class="col-auto d-flex no-block align-items-center mx-1">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20" viewBox="0 0 24 24" version="1.1" class="svg-icon text-primary mb-1">
                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <rect id="bound" x="0" y="0" width="24" height="24" />
                            <circle id="Oval-5" fill="#000000" opacity="0.3" cx="12" cy="12" r="10" />
                            <path d="M16.7689447,7.81768175 C17.1457787,7.41393107 17.7785676,7.39211077 18.1823183,7.76894473 C18.5860689,8.1457787 18.6078892,8.77856757 18.2310553,9.18231825 L11.2310553,16.6823183 C10.8654446,17.0740439 10.2560456,17.107974 9.84920863,16.7592566 L6.34920863,13.7592566 C5.92988278,13.3998345 5.88132125,12.7685345 6.2407434,12.3492086 C6.60016555,11.9298828 7.23146553,11.8813212 7.65079137,12.2407434 L10.4229928,14.616916 L16.7689447,7.81768175 Z" id="Path-92" fill="#000000" fill-rule="nonzero" />
                        </g>
                    </svg>
                </div>
                <div class="col-auto pl-0">
                    <div class="text-capitalize font-weight-bold"><?= _("Phân tích theo ngày") ?>
                    </div>
                    <div class="text-muted similarDates font-10">12.2019 - 02.2020</div>
                </div>
            </div> -->
            <div>
                <ul class="nav customTabColor changecltab">
                    <li class="nav-item">
                        <a class="nav-link active" id="tabchart" data-toggle="tab" data-value="ClickChart" href="#ClickChart">Tỷ lệ Click</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="tabchart" data-toggle="tab" data-value="LeadChart" href="#LeadChart">Lead</a>
                    </li>
                    <span class="flatpickr mt-3 mt-md-0 py-2 py-md-0 ml-auto h-100 d-flex no-block justify-content-end align-items-center">
                    <input type="text" style="width:170px" id="rangeChart" placeholder="Please select Date Range" data-input>
                        <!-- <a class="input-button" title="toggle" data-toggle><i class="fal fa-calendar-alt font-14 ml-3"></i></a> -->
                    </span>
                </ul>
                <div class="d-flex no-block flex-column pt-3 px-3 pt-md-4 px-md-4 bg-dark ">
                    <span class="text-white font-gg font-16">
                        <strong class="tukhoaLienQuan font-gg font-16 text-info"></strong>                       
                    </span>
                </div>
                <div class="row">
                    <div class="col-12 col-md-12 tab-content">
                        <div class="tab-pane px-4 active bg-dark" id="ClickChart" role="tabpanel" style="height: 300px;width:100%;"></div>
                        <div class="tab-pane px-4 bg-dark" id="LeadChart" role="tabpanel" style="height: 300px;width:1080px;"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="homepageMission maxWidth-1080  m-auto">
        <div class="mt-5">
            <ul class="nav customTabColor">
                <li class="nav-item">
                    <a class="nav-link active" id="tabtable" data-toggle="tab" data-value="listMyMission" href="#listMyMission">Nhiệm vụ</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link listMyAllData" id="tabtable" data-toggle="tab" data-value="listMyAllData" href="#listMyAllData">Data khách hàng</a>
                </li>

            </ul>
        </div>

        <table id="myLockUrl" class="table ">
        </table>
    </div>



<? } else { ?>

    <div class="homepageMission maxWidth-1080 pt-8 m-auto pt-md-2">

        <h2 class="pt-2 text-gray text-center fontSize-24 md-FontSize20">Hệ Thống Hoạt Động Ra Sao</h2>
        <hr width="20%">
        <div class="stepper pt-5 pt-md-0rem">
            <div class="step_item">
                <i class="fad fa-bullseye-pointer text-danger"></i>
                <div class="step_header text-info mt-2">(1) Tương tác</div>
                <div class="step_des pb-2">Yêu cầu người dùng tương tác vào bài viết, gồm cả Like và Comment</div>
                <div class="step_img d-none d-sm-block"><img src="<?= $rootURL ?>/dist/images/step-1.png"></div>
            </div>
            <div class="step_item">
                <i class="fad fa-radar text-danger"></i>
                <div class="step_header text-info mt-2">(2) Xác nhận</div>
                <div class="step_des pb-2">Yêu cầu login facebook để xác nhận bạn đã tương tác</div>
                <div class="step_img d-none d-sm-block"><img src="<?= $rootURL ?>/dist/images/step-2.jpg"></div>
            </div>
            <div class="step_item">
                <i class="fad fa-lock-open-alt text-danger"></i>
                <div class="step_header text-info mt-2">(3) Mở khóa</div>
                <div class="step_des pb-2">Kiểm tra tài khoản vừa xác nhận và tương tác để mở khóa</div>
                <div class="step_img d-none d-sm-block"><img src="<?= $rootURL ?>/dist/images/step-3.jpg"></div>
            </div>
        </div>
    </div>
<? } ?>
<script src="<?= $rootURL ?>/dist/js/pages/index.v1.js?v=<?= $version ?>"></script>
<script src="<?= $rootURL ?>/dist/js/default/header.js?v=<?= $version ?>"></script>

<? require_once(__DIR__ . "/modules/footer.php") ?>