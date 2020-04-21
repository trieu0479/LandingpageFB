var userTokenDemo = "ZGdZVktsdE91by9qOUtndjc4MjYwTHdQeXllT3NKTS9ZUHVzdThJYTNWST06OhMNb7G48NOo6noCn1JFw0I"; //demo@fff.com.vn 
var cid = ""; //5390797993 //6326778549
var MONITOR_ONLY = "";
var BROWSER_RULE = "";
var BIGDATA_RULE = "";
var DISABLE_MOBILE = "FALSE";
var VPN_PROXY_LIST = "";
var EXCLUSION_LIST = "";
var LOCATION_RULE = "";
var IP_RULE = "";
var GROUP_RULE = "";
var network_3G_4G_LIST = "";
var campaigns = "";
let dayNow = new Date();
let now = new Date();
var endDate = now.setDate(now.getDate() - 7);
var startDate = now.setDate(now.getDate() - 14);;
var from;
var to;
var from;
var to_;

const url = new URL(location.href);
cid = originalCid = url.searchParams.get("cid")

// set usertoken
function setCookie(cname, cvalue, exdays,domain='.fff.com.vn') {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    // document.cookie = cname + "=" + cvalue + ";" + expires + ";domain=" + domain + ";path=/";
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

/*overight default token */
//userToken = url.searchParams.get("userToken");

if (url.searchParams.get("userToken")){
    userToken = url.searchParams.get("userToken");
    
    setCookie("userToken", userToken, 3);
}else{
    userToken = getCookie("userToken");
}
if (!userToken) userToken = userTokenDemo;

// truong hop con lai se la default token 
/*overight default token */

async function getListAdwordsAccount() {
    try {
        return await $.get(`//localapi.trazk.com/fff/user.php?task=getUserAdwords&userToken=${userToken}`)
    } catch (error) {
        console.error(error)
    }
}

function formatAdWordsCid(item) {
    if (item.isvip == 1) txtVip = "[VIP]";
    else txtVip = "[FREE]";
    return txtVip + " " + item.adwords_cid;
}

async function showAlertSelectAdWords(listAdWordsAccount) {
    var options = "";
    for (i = 0; i < listAdWordsAccount.length; i++) {
        options += `<option value="${listAdWordsAccount[i].adwords_cid}">${formatAdWordsCid(listAdWordsAccount[i])}</option>`;

    }

    const result = await Swal.fire({
        title: 'Vui lòng chọn tài khoản AdWords',
        html: `
          <div class="text-left mb-2">
          <button type="button" class="btnKetNoi btn waves-effect waves-light btn-block  btn-outline-info">Kết nối tài khoản Adwords Mới</button>

          <h5 class="m-t-30 m-b-30"><strong>Hoặc</strong> chọn tài khoản AdWords của bạn 
            <span class="float-right"><a target="blank" href="https://admin.fff.com.vn/adwords.php?view=config&amp;action=quan-ly-tai-khoan">Toàn bộ tài khoản</a></span>
          </h5>
            <select id="select-cid" class="form-control custom-select">
                <option value="0">Chọn tài khoản AdWords</option>
                ${options}
            </select> 
          </div>
        <div class="mt-5">
            <button type="button" class="btnXemBaoCao btn waves-effect waves-light btn-block  btn-outline-danger">Xem báo cáo</button>
        </div> `,
        showCloseButton: true,
        showCancelButton: false,
        showConfirmButton: false,
        allowOutsideClick: false,
        confirmButtonText: 'Tiếp theo',
        focusConfirm: false,
        padding: "4em",
        width: "600px",
        position: "top",
        onOpen: () => {
            $("#select-cid").on("change", function () {
                // setCookie("selected-cid",$(this).val(),1); 

            });

            $(".btnKetNoi").click(function () {
                window.location.href = "https://admin.fff.com.vn/popup.php?view=popup&action=connect-adwords";
            })

            $(".btnXemBaoCao").click(function () {

                $(".swal2-confirm").click()
            })
        },
        preConfirm: async () => {
            if ($("#select-cid").val() == 0) {
                Swal.showValidationMessage(
                    `Vui lòng chọn cid !`
                )
            } 

            return $("#select-cid").val();
        }
    })

    if (result.value) {
        cid = result.value;
        window.location.href = `?cid=${cid}`;
    }

}

function showAlertConnectNewAdWords() {
    Swal.fire({
        title: 'Bạn cần thêm 1 tài khoản AdWords',
        html: `
          <div>
            <div class="text-center p-t-10 p-b-10">
              <i class="flaticon-presentation-1 font64"></i>
            </div>
            <p>Để xem report (báo cáo) quảng cáo Google Ads bạn cần kết nối tài khoản Google Ads vào hệ thống</p>
            <div>
              <button type="button" class="btn waves-effect waves-light btn-info">Liên Kết AdWords</button>
            </div>
          </div>
          `,
        showCloseButton: true,
        showCancelButton: false,
        showConfirmButton: false,
        focusConfirm: false,
        padding: "3em",
        width: "600px",
        position: "top",

    })
}

getListAdwordsAccount().then(data => {
    data = JSON.parse(data);
    if (data.data.data) {
        let option = "";

        data.data.data.forEach((ele, index) => {
            if (ele.adwords_cid == cid) {
                option += `<option selected="selected" value="${ele.adwords_cid}">${formatAdWordsCid(ele)}</option>`;
            } else {
                if (index == 0)
                    option += `<option selected="selected" value="${ele.adwords_cid}">${formatAdWordsCid(ele)}</option>`;
                else
                    option += `<option value="${ele.adwords_cid}">${formatAdWordsCid(ele)}</option>`;
            }
        })

        $("#selectListAdwordsAccount").html(option)
    }
})

$(document).ready(() => {



})