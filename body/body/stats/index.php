<!-- <link rel="stylesheet" href="../../dist/css/bootstrap-select.min.css"> -->
<link rel="stylesheet" href="../../dist/css/pages/stats.css">
<div class="container maxWidthPc-1280">
    <div class="row my-5">
        <div class="col">
            <div class="text-center pb-5 pt-5 pt-md-5">
            <div class="fontSize-16 font-weight-bold text-success">FFF BLUE</div>
            <div class="fontSize-24 font-weight-bold text-primary">Công Cụ Xếp Hạng Facebook</div>
            <div class="text-center mt-2 mb-2 extensionLogo">
                <a target="blank" href="https://chrome.google.com/webstore/detail/fffblue-facebook-viral-to/fpogdcgblkkiadigokjobbfganhbihhn?hl=vi"><img src="https://webrank.vn/dist/images/chrome-extension.png" class="mr-2"></a>
                <a target="blank" href="https://microsoftedge.microsoft.com/addons/detail/fhohbkpkplmojpkmgbcejdikljogdolh"><img src="https://webrank.vn/dist/images/edge-extension.png"></a>
            </div>
            <div class="fontSize-14 text-muted mb-2">Công cụ xem xếp hạng fanpage trên facebook</div>     
        </div>
        <div class="maxWidth-800 pb-5 m-auto mrl-md-1">
            <div class="input-group mt-3 input-loading">
                <input type="text" id="input-searchFbRank" autocomplete="off" class="form-control add-fbid fontSize-14 p-2 ml-1 font-12 rounded mr-2form-control add-fbid fontSize-14 p-2 ml-1 font-12 rounded mr-2" data-fbid="" aria-label="Nhập tên fanpage của bạn vào đây" value="" placeholder="Nhập tên fanpage của bạn vào đây">
                <div class="Fanpage-container" id="fanpage-search"></div>
                <div class="input-group-append">
                    <button id="nextButton" class="ml-auto  btn-Step1 btn btn-info"><i class="fad fa-layer-plus mr-2"></i> Tiếp tục</button>
                </div>
                <div class="form-group text-left input-step3 d-none mt-2 text-danger" id="alert_message">
                    <span class="span-important-maxlead">Vui lòng lựa nhập fanpgae trước khi tiếp tục</span>
                </div>
            </div>
        </div>
    </div>
</div>

    <div class="row">
        <div class="col-12 col-md-2 col-lg-2 px-lg-2 px-md-0 px-0 px-md-2">
            <div class="kt-portlet kt-portlet--height-fluid d-none d-md-block d-lg-block">
                <div class="kt-portlet__head bg-dark" style="border-radius: 0 ">
                    <div class="kt-portlet__head-label d-flex align-items-lg-center">
                        <h3 class="kt-portlet__head-title pt-3 pt-md-1 text-white fontSize-14">
                            Danh mục
                        </h3>
                    </div>
                </div>
                <div class="kt-portlet__body">
                    <div class="kt-widget6">
                        <div class="kt-widget6__body" id="catalogFbRank">
                        <a href="?view=stats&action=index" class="kt-fbrank all-active">
                                <div id="" class="kt-widget6__item">
                                <!-- <span class="pr-2"><i class="fad fa-globe-asia text-info"></i></span> -->
                                <span><i class="fad fa-globe-asia text-info pr-2"></i> Toàn bộ</span>
                            </div>
                        </a>
                        
                        
                    </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-10 col-10 pb-3 pb-lg-5">
            <div class="content-table mt-5 text-left m-auto">
                <table class="table mb-0 dataTable borderless no-footer table-fbRank" id="tablefbRank">
                </table>
            </div>
        </div>
    </div>

</div>
<!-- <script src="../../dist/js/bootstrap-select.min.js"></script> -->
<!-- <script src="<?=$rootURL?>/dist/js/pages/stats/stats.js"></script> -->
<script src="../../dist/js/pages/stats/stats.js"></script>
