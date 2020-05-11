<link rel="stylesheet" href="dist/css/pages/stats.css">
<!-- <div class="container"> -->
    <div class="row my-5">
        <div class="col">
            <div class="text-center pb-5 pt-5 pt-md-5">
            <div class="fontSize-16 font-weight-bold text-success">FFF BLUE</div>
            <div class="fontSize-24 font-weight-bold text-primary">Công Cụ Tăng Tương Tác Facebook</div>

            <div class="text-center mt-2 mb-2 extensionLogo">
                <a target="blank" href="https://chrome.google.com/webstore/detail/facebook-tools/kccoacihbkcjdkjmhpaojhonlcjnmmld"><img src="https://webrank.vn/dist/images/chrome-extension.png" class="mr-2"></a>
                <a target="blank" href="https://microsoftedge.microsoft.com/addons/detail/fhohbkpkplmojpkmgbcejdikljogdolh"><img src="https://webrank.vn/dist/images/edge-extension.png"></a>
            </div>
            <div class="fontSize-14 text-muted mb-2">Tạo khóa link, yêu cầu người dùng tương tác (Like và Comment) vào post trên Facebook để mở khóa </div>        
        </div>
            <div class="maxWidth-800 pb-5 m-auto mrl-md-1">
                <div class="input-group mt-3">
                    <input type="text" class="form-control fontSize-14 p-2 ml-1 font-12 rounded mr-2" aria-label="Nhập tên miền website của bạn vào đây" value="" placeholder="Nhập tên miền website của bạn vào đây">
                    
                    <div class="input-group-append">
                        <button class="ml-auto  btn-Step1 btn btn-info"><i class="fad fa-layer-plus mr-2"></i> Tiếp tục</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script>
    $.get(`//v7-fffblue.com/server/stats.php?task=getFacebookInformation&userToken=${userToken}&fbId=101162088206729`,function(data){
        // data = JSON.parse(data)
        
        console.log(data)
    })
</script>
