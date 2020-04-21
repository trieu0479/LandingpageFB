$(document).ready(() => {
    $('.topbar .top-navbar .navbar-header a').click(() => {
        $('.skin-dark .left-sidebar').addClass('active')
    })
    $('.left-sidebar .sidebar-nav ul>li:first-child .wrapper-menu').click(() => {
        $('.skin-dark .left-sidebar').removeClass('active')
    })
    
    $.getJSON(`//localapi.trazk.com/fff/user.php?task=getUserInfo&userToken=${userToken}`, function(res) {
        let img_data_top=res.data.data.avatar
        $('.profile-pic').append(`<div class="box-img-top" ><img class="w-100"  src="${img_data_top}" alt=""></div>`)
        if (res){
            var userData = res.data;
            var txtVip = "";
            var ToolToVN = {};
            
            ToolToVN['chamkhach'] = "Chăm khách";
            ToolToVN['timkhach'] = "Tìm khách";
            ToolToVN['phantich'] = "Phân Tích";
            ToolToVN['quangcao'] = "Quảng cáo";
            ToolToVN['hutkhach'] = "Hút khách";
            ToolToVN['fraudclick'] = "Chặn click ảo";
            ToolToVN['all'] = "Toàn bộ";

            for (i=0;i<userData.vipData.length; i ++){
                txtVip += "<span>"+ ToolToVN[userData.vipData[i].vipTool] + "</span>";
                
            }
            if (txtVip == "") txtVipText = '<span>Gói miễn phí</span>';
            else{
                txtVipText =`<strong class="mr-1">VIP</strong> ${txtVip}`;
                $(".box-img-top").prepend('<i class="vuongmien"></i>');
            }
            tmpData = `
                <div class="userData"><img src="${userData.data.avatar}"> 
                    <h4>${userData.data.fullname}</h4>
                    <h5>${txtVipText}</p>
                </div>

            `;
            
           $(".userDataMenu").prepend(tmpData);
        }
    })
});
