<link rel="stylesheet" href="../..//dist/css/pages/detail.css">


	<!-- cover of fanpage -->
		<div class="container">
			<div class="row">
				<div class="col-12 col-lg-12 mt-3 bannerPageAds">
					<div id="bannerPageAds" class="" style="height:390px">
						<div class="imgPageAds d-flex align-items-end imgPageAds-custom is-loading" id="fbCover">
							<img class=" mb-4 rounded-circle AvaPageAds is-loading" id="fbAva">
							<div class="p-2 mb-2 mb-lg-5 pl-3">
								<div class="font-16 font-weight-bold text-white is-loading" id="fbName"><img class="ml-n1" src="https://webrank.vn/dist/images/check.png" style="width:20px"></div>
								<div class="font-12 text-white" id='fbUsername'></div>
								<div class="font-12 text-white" id='fbCate'></div>
							</div>
							<div class="ml-auto mb-5">
								<div class="bg-white" style="border-radius: 5px;padding: 5px 10px 5px 10px;">
									<div class="font-12 text-dark p-2"><i class="far fa-flag-alt"></i> Ngày thành lập <span id='fbBirthday'>October 14 2011</span><div>
								</div>
								<div class="position-absolute w-100 d-flex" style="top: 25px; left: -15px; justify-content: end; align-items: end; text-align: end;">
									<div class="control-block-button mr-auto ml-5">
										<a target="_blank" href="?view=stats&action=index" class="btn btn-control bg-white ">
											<i class="fad fa-arrow-to-left text-danger icon-modifine"></i>
										</a>
									</div>
									<div class="control-block-button">
										<a target="_blank" href="" class="btn btn-control bg-blue" id="fbLink">
											<i class="fab fa-facebook-f icon-modifine"></i>
										</a>
										<a target="_blank" href="#" class="btn btn-control " id="webLink" style="background-color: #ff9700">
											<i class="fad fa-browser icon-modifine"></i>
										</a>
									</div>
									
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>



<!-- body infomation of fanpage -->

<div class="home-page" >

	<!-- thông tin  of fanpage -->
	<div class="container">
		<div class="row">
			<div class="col-lg-3 col-md-6 col-12 my-3 px-0" style="padding-left:15px !important">
				<div class="box-info bg-white p-4 border-right mih-100 h-100">
					<p class="note-top fontsize-14 text-center">
						Lượt like hiện tại
					</p>
					<h3 class="text-first text-info fontsize-44 text-center is-loading" id="likeNow">
						
					</h3>
					
				</div>
			</div>
			<div class="col-lg-3 col-md-6 col-12 my-3 px-0">
				<div class="box-info bg-white p-4 border-right mih-100 h-100">
					<p class="note-top fontsize-14 text-center">
						Lượt truy cập
					</p>
					<h3 class="text-first text-success fontsize-44 text-center is-loading"  id="fbhereCount">
						
					</h3>
					
				</div>
			</div>
			<div class="col-lg-3 col-md-6 col-12 my-3 px-0">
				<div class="box-info bg-white p-4 border-right mih-100 h-100">
					<p class="note-top fontsize-14 text-center">
						Bài đánh giá
					</p>
					<h3 class="text-first text-danger fontsize-44 text-center is-loading" id="fbTalkingAbout">
						
					</h3>
					
				</div>
			</div>
			<div class="col-lg-3 col-md-6 col-12 my-3 px-0" style="padding-right:15px !important">
				<div class="box-info bg-white p-4 border-right mih-100 h-100">
					<p class="note-top fontsize-14 text-center">
						Checkin
					</p>
					<h3 class="text-first text-secondary fontsize-44 text-center is-loading" id="checkin">
						...
					</h3>
					
				</div>
			</div>


		</div>
	</div>

	<!-- Biểu đồ của fanpage -->
	<div class="container mb-3">
		<div class="row">
			<div class="col-lg-12 col-md-6 col-12 mt-0">
				<div class="ui-block bg-white">
					<div class="ui-block-title">
						<h6 class="title mb-0">Biểu đồ thống kê lượt like</h6>
					</div>
					<div class="box-chart-likes bg-white is-loading" id="chartLikes" style="height:315px">

					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- newsfeed of fanpage -->
	<div class="newsfeed-page" >
		<div class="container">
			<div class="row">
				<div class="content-table mt-5 text-left m-auto col-12">
						<div class="ui-block-title bg-white">
							<h6 class="title mb-0 ">Các bài viết mới nhất</h6>
						</div>
					<table class="table mb-0 dataTable borderless no-footer" id="fbPostRank">
					</table>
				</div>
			</div>
		</div>
	</div>

	<!-- profile of fanpage -->
	<div class="profile-page">
		<div class="container">
			<div class="row">
				<div class="col order-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 my-3">
					<div class="ui-block bg-white">
						<div class="ui-block-title">
							<h6 class="title mb-0">Bảng thông tin thêm về Fanpage</h6>
						</div>
						<div class="ui-block-content">
							<div class="row">
								<div class="col col-lg-6 col-md-6 col-sm-12 col-12">
									<ul class="widget w-personal-info item-block">
										<li>
											<span class="title">Giới thiệu:</span>
											<span class="text is-loading pl-1 is-loading" id="fbAbout"></span>
										</li>
										<li>
											<span class="title">Link Fanpage:</span>
											<a href="" target="_blank" class="text hover-color pl-1 is-loading" id='fbLinkFg'></a>
										</li>
										<li>
											<span class="title">Website:</span>
											<a href="" class="text pl-1 is-loading" id="fbWebsite"></a>
										</li>
										<li>
											<span class="title">Điện thoại</span>
											<span class="text pl-1 is-loading" id='fbPhone'></span>
										</li>
									</ul>
								</div>
								<div class="col col-lg-6 col-md-6 col-sm-12 col-12">
									<ul class="widget w-personal-info item-block">
										<li>
											<span class="title">Nội dung</span>
											<span class="text pl-1 pr-4 is-loading" id="description"></span>
										</li>
										<li>
											<span class="title">Loại fanpage: </span>
											<span class="text pl-1 is-loading" id="categoryDes"></span>
										</li>
										<li>
											<span class="title">Liên kết App</span>
											<span class="text pl-1 is-loading" id="haveApp"></span>
										</li>
										
										<li>
											<span class="title">Giải thưởng</span>
											<span class="text pl-1 pr-4 is-loading" id="awards"></span>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- thống kê lượt like of fanpage -->
	<div class="container">
		<div class="row">
			<div class="col-12 mb-3 mt-0">
				<div class=" ui-block-title text-left py-3 bg-white" style="border-radius: 0px">
					<h6 class="title mb-0">Bảng thống kê lượt like</h6>
				</div>
				<div class="content-table mt-5 text-left m-auto">
					<table class="table mb-0 dataTable borderless no-footer" id="tableRank-fb">
					</table>
				</div>
			</div>
		</div>
	</div>


</div>


	

	
	










<!-- <script>var fbId = <?=$_GET['fbid']?></script> -->
<script src="../../dist/js/pages/stats/detail.js"></script>