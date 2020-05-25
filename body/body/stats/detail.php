<link rel="stylesheet" href="<?=$rootURL?>/dist/css/pages/detail.css">



<div class="container">
	<div class="row">
		<div class="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-4">
			<div class="fb-cover position-relative ">
				<img src="" class="fbCover img-fluid" alt="" class="img-facebookCover">
			</div>
			<div class="profile-section">
				<div class="row">
					<div class="col col-lg-3 col-md-3 col-sm-3 col-3">

						<ul class="nav profile-menu pl-3" id="myTab">
							<li class="nav-item">
								<a class=" active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true"><span class="text-info"><i class="fad fa-globe-europe mr-2"></i></span>Thống kê</a>
							</li>
							<li class="nav-item">
								<a class="" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false"><span  class="text-success"><i class="fad fa-newspaper mr-2"></i></span>Thông tin</a>
							</li>
						</ul>
						

					</div>

					<div class="col-md-6 col-lg-6 col-sm-12 text-right ml-auto">
						<div class=" d-flex justify-content-between bg-white">
							<div class="flatpickr ml-auto mr-4 h-100 d-flex no-block p-2 justify-content-end align-items-center" style="border-bottom: 1px solid #edf1f5; border-radius:5px">
								<input type="text" style="width:170px; border: none; "  id="rangeDateSeo" placeholder="Please select Date Range" data-input="" class="flatpickr-input" readonly="readonly">
								<a class="input-button" title="toggle" data-toggle=""><i class="fal fa-calendar-alt font-14 ml-3"></i></a>
							</div>
						</div>
					</div>
				</div>

				<div class="control-block-button">
					<a href="" target="_blank" class="btn btn-control bg-blue" id="fbLink">
						<i class="fab fontsize-20 fa-facebook-f"></i>
					</a>

					<a href="" target="_blank" class="btn btn-control bg-purple" id="webLink">
						<i class="fad fontsize-20 fa-browser"></i>
					</a>
				</div>

			</div>
			<div class="top-header-author">
				<div class="author-thumb">
					<img id="fbAva" class="img-fluid is-loading" src="" alt="author">
				</div>
				<div class="author-content">
					<div class="dashed font-weight-500 text-center justify-content-center fontsize-18 font-weight-bold text-primary d-flex is-loading" id="fbName"></div>
					<div class="dashed font-weight-500 text-center justify-content-center fontsize-16 font-weight-bold text-dark d-flex is-loading" id="fbCate"></div>
				</div>
			</div>
		</div>
	</div>
</div>

<div class="tab-content" id="myTabContent">


  <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
	<div class="container">
		<div class="row">
			<div class="col-lg-3 col-md-6 col-12 mt-3 px-0" style="padding-left:15px !important">
				<div class="box-info bg-white p-4 border-right mih-100 h-100">
					<p class="note-top fontsize-14 text-center">
						Lượt like hiện tại
					</p>
					<h3 class="text-first text-info fontsize-44 text-center is-loading" id="likeNow">
						
					</h3>
					
				</div>
			</div>
			<div class="col-lg-3 col-md-6 col-12 mt-3 px-0">
				<div class="box-info bg-white p-4 border-right mih-100 h-100">
					<p class="note-top fontsize-14 text-center">
						Lượt tìm kiếm
					</p>
					<h3 class="text-first text-success fontsize-44 text-center is-loading"  id="founded">
						
					</h3>
					
				</div>
			</div>
			<div class="col-lg-3 col-md-6 col-12 mt-3 px-0">
				<div class="box-info bg-white p-4 border-right mih-100 h-100">
					<p class="note-top fontsize-14 text-center">
						Bài đánh giá
					</p>
					<h3 class="text-first text-danger fontsize-44 text-center is-loading" id="fbTalkingAbout">
						
					</h3>
					
				</div>
			</div>
			<div class="col-lg-3 col-md-6 col-12 mt-3 px-0" style="padding-right:15px !important">
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
	<div class="container mb-4">
		<div class="row">
			<div class="col-lg-12 col-md-6 col-12 mt-3">
				<div class="ui-block bg-white">
					<div class="ui-block-title">
						<h6 class="title">Biểu đồ thống kê lượt like</h6>
					</div>
					<div class="box-chart-likes bg-white is-loading" id="chartLikes" style="height:315px">

					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="container mb-4">
		<div class="row">
			<div class="col-12 col-12 pb-3 pb-lg-5">
				<div class=" ui-block-title text-left py-3 bg-white">
					<h6 class="title">Bảng thống kê lượt like</h6>
				</div>
				<div class="content-table mt-5 text-left m-auto">
					<table class="table mb-0 dataTable borderless no-footer" id="tableRank-fb">
					</table>
				</div>
			</div>
		</div>
	</div>
  </div>




  <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
  <div class="container">
	<div class="row">
		<div class="col order-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 my-3">
			<div class="ui-block bg-white">
				<div class="ui-block-title">
					<h6 class="title">Bảng thông tin thêm về Fanpage</h6>
				</div>
				<div class="ui-block-content">
					<div class="row">
						<div class="col col-lg-6 col-md-6 col-sm-12 col-12">

							
							<!-- W-Personal-Info -->
							
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
							
							<!-- ... end W-Personal-Info -->
						</div>
						<div class="col col-lg-6 col-md-6 col-sm-12 col-12">

							
							<!-- W-Personal-Info -->
							
							<ul class="widget w-personal-info item-block">
								<li>
									<span class="title">Loại fanpage: </span>
									<span class="text pl-1 is-loading" id="categoryDes"></span>
								</li>
								<li>
									<span class="title">Liên kết App</span>
									<span class="text pl-1 is-loading" id="haveApp"></span>
								</li>
								<li>
									<span class="title">Mục tiêu</span>
									<span class="text pl-1 is-loading" id="mission"></span>
								</li>
								<li>
									<span class="title">Vị trí:</span>
									<span class="text pl-1 is-loading" id="location"></span>
								</li>
							</ul>
							
							<!-- ... end W-Personal-Info -->
						</div>
					</div>
				</div>
			</div>
		</div>


		</div>
	</div>
	
  </div>
</div>








<script>var fbId = '<?=$_GET['fbid']?>'</script>
<script src="<?=$rootURL?>/dist/js/pages/stats/detail.js"></script>