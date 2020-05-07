<nav class="navbar navbar-expand-sm bg-topmenu">
<a class="navbar-brand" href="#"><img src="<?=$rootURL?>/dist/images/logo/logo.jpg" width="30" height="30" class="d-inline-block align-top" alt=""></a>
<!-- Links -->
  <ul class="navbar-nav">
    <li class="nav-item">
      <a class="nav-link" href="#">Trang chủ</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="https://help.fff.com.vn/cong-cu-facebook/tang-tuong-tac-facebook">Hướng dẫn</a>
    </li>
  </ul>


  <? if ( $userToken != $demoToken){?>
    <ul class="navbar-nav topRightMenu ml-auto">


        <li class="nav-item-right dropdown  dropdown-list-a" >
            <a class="profile-pic"></a>
            <div class="dropdown-menu-li userDataMenu  animate  slideIn " aria-labelledby="navbarDropdown">
                <!-- text-->
                <a href="https://admin.fff.com.vn/account/index.php?userToken=<?=$userToken?>&view=user&action=information" class="dropdown-item"><i class="fad fa-user-tie"></i> Thông tin
                    tài khoản</a>
                <!-- text-->
                <a href="https://admin.fff.com.vn/account/index.php?userToken=<?=$userToken?>&view=user&action=adword-management" class="dropdown-item"><i class="fad fa-bring-forward"></i> Quản lý
                    AdWords</a>
                <!-- text-->
                <a href="https://admin.fff.com.vn/account/index.php?userToken=<?=$userToken?>&view=user&action=website-management" class="dropdown-item"><i class="fad fa-browser"></i> Quản lý website</a>
                <a href="https://admin.fff.com.vn/account/index.php?userToken=<?=$userToken?>&view=user&action=plugin" class="dropdown-item"><i class="fad fa-plug"></i> Quản lý tiện ích</a>
                <!-- text-->
                <!-- <div class="dropdown-divider">**********</div> -->
                <!-- text-->
                <a href="https://admin.fff.com.vn/account/index.php?userToken=<?=$userToken?>&view=user&action=payment-table" class="dropdown-item"><i class="fad fa-gem"></i> Nâng cấp VIP</a>
                <a href="https://admin.fff.com.vn/account/index.php?userToken=<?=$userToken?>&view=user&action=payment-history" class="dropdown-item"><i class="fad fa-calendar-alt"></i> Lịch sử thanh toán</a>
                <!-- text-->
                <!-- <div class="dropdown-divider"></div> -->
                <!-- text-->
                <a href="javascript:void(0);" class="doLogout dropdown-item"><i class="fa fa-power-off"></i> Thoát</a>
                <!-- text-->
            </div>
        </li>
        <!-- ============================================================== -->
        <!-- End User Profile -->
        <!-- ============================================================== -->
    </ul>
    <?}else{?>
        <ul class="navbar-nav ml-auto">
                <li class="nav-item active d-md-block">
                <a class="nav-link btn-showLoginModal" href="#">Đăng nhập</a>
            </li>
            
            
        </ul>
    <?}?>

</nav>