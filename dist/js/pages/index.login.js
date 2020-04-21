$( document ).ready(function() {

    renderTableLockedUrl();

    function initDatatable(select, tableOptions) {
        const table = $(`#${select}`).DataTable(tableOptions);
        return table;
    }
    function renderTableLockedUrl() {
        initDatatable(
            'myLockUrl', {
                ajax: {
                    url: `//localapi.trazk.com/2020/api/facebook/index.php?task=listLockedLink&userToken=${userToken}`,

                    dataSrc: function (res) {               
                        var columns =[];
                        $.each(res.data,function (k,v){
                            var output = {};
                            output.alias =  v.alias;
                            output.custom = v.custom;
                            output.click = v.click;
                            output.status = v.status;
                            output.countUser = v.countUser;
                            
                            output.missionType = v.missionType.replace("LIKECOMMENT","LIKE-COM");
                            output.missionFbId = v.missionFbId;
                            output.missionFbUrl = v.missionFbUrl;
                            output.url = v.url;
                            output.insertDate = v.insertDate;
                           
                            columns.push(output);
                        })
                        return columns;
                    },
                },

                drawCallback: function (settings) {},
                columns: [{
                        title: '<strong>Link</strong>',
                        data:  (data) => `<a class="text-gray" href="https://fff.blue/detail/${data.alias}?userToken=${userToken}">https://fff.blue/${data.alias}</a>`,
                        className: 'text-left',
                       
                    },
                    {
                        title: '<strong>Click</strong>',
                        data: 'click',
                        className: 'text-left',
                       
                    },
                    
                    {
                        title: '<strong>Data</strong>',
                        data: 'countUser',
                        className: 'text-left',
                       
                    },
                    
                    {
                        title: '<strong>Nhiệm vụ</strong>',
                        data:  (data) => `<span class="badge-mission  badge-${data.missionType}">${data.missionType}</span>`,
                        className: 'text-center',
                        width: '150'
                    },
                    {
                        title: '<strong>Thêm ngày</strong>',
                        data: 'insertDate',
                        className: 'text-left',
                        width: '150',

                    },
                   
                ],
              
                buttons: [
                    'copy', 'excel',
                ],
                dom: 'Bfrtip',
                paging: true,
                autoWidth: false,
                pageLength: 50,
                info: false,
                responsive: true,
                searching: false,
                ordering:false,
                
               
                language: {
                    loadingRecords: '<div class="placeholder-loading" style="height:10px">Đang tải</div>',
                    paginate: {
                        first: "Đầu",
                        last: "Cuối",
                        next: '<i class="fas fa-angle-right"></i>',
                        previous: '<i class="fas fa-angle-left"></i>'
                    },
                    search: 'Tìm kiếm <span class="ml-1"></span>:',
                    searchPlaceholder: 'Nhập từ khóa ...',
                    processing: 'Đang xử lý...',
                    loadingRecords: 'Đang tải...',
                    emptyTable: 'Không có dữ liệu hiển thị',
                    lengthMenu: '<div class="ml-4 font-gg"> Hiển thị <span class="ml-1">:</span>  <span class="ml-2" style="border:.5px solid #eee;padding: 4px 8px!important;">_MENU_</span> <span class="ml-1">kết quả </span></div>',
                    zeroRecords: 'Không tìm thấy dữ liệu',
                    info: '<div class="ml-4 font-gg mt-3">Hiển thị từ _START_ đến _END_ trong _TOTAL_ kết quả</div>',
                    infoEmpty: '',
                    infoFiltered: '(lọc từ tổng số _MAX_ dòng)',
                }
            }
        )


    }
});