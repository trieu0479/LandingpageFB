<link rel="stylesheet" href="../../dist/css/pages/detail.css">



<div class="container">
	<div class="row">
		<div class="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-4">
			<div class="fb-cover position-relative ">
				<img src="" class="fbCover " alt="" class="img-facebookCover">
			</div>
			<div class="profile-section">
				<div class="row">
					<div class="col col-lg-5 col-md-5 col-sm-12 col-12">

						<ul class="nav profile-menu" id="myTab">
							<li class="nav-item">
								<a class=" active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Thống kê</a>
							</li>
							<li class="nav-item">
								<a class="" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Thông tin</a>
							</li>
						</ul>
						

					</div>

					<div class="col-md-6 col-lg-6 col-sm-12 text-right ml-auto">
						<div class=" d-flex justify-content-between bg-white">
							<div class="flatpickr ml-auto mr-4 h-100 d-flex no-block p-2 justify-content-end align-items-center" style="border: 1px solid #edf1f5; background: #edf1f5; border-radius:5px">
								<input type="text" style="width:170px; border: none; background: #edf1f5;"  id="rangeDateSeo" placeholder="Please select Date Range" data-input="" class="flatpickr-input" readonly="readonly">
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
					
					<div class="btn btn-control bg-oranger" id="phoneNumb" type="button" class="btn btn-secondary" data-toggle="tooltip" data-placement="top" title="Tooltip on top">
						<i class="fad fontsize-20 fa-mobile-alt"></i>
					</div>
				</div>

			</div>
			<div class="top-header-author">
				<div class="author-thumb">
					<img id="fbAva" src="" alt="author">
				</div>
				<div class="author-content">
					<div class="similarDomain dashed font-weight-500 text-center justify-content-center fontsize-18 font-weight-bold text-primary d-flex" id="fbName"></div>
					<div class="similarDomain dashed font-weight-500 text-center justify-content-center fontsize-16 font-weight-bold text-dark d-flex " id="fbCate"></div>
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
				<div class="box-info bg-white p-4 border-right">
					<p class="note-top fontsize-14 text-center">
						top grade
					</p>
					<h3 class="text-first text-info fontsize-44 text-center">
						A++
					</h3>
					
				</div>
			</div>
			<div class="col-lg-3 col-md-6 col-12 mt-3 px-0">
				<div class="box-info bg-white p-4 border-right">
					<p class="note-top fontsize-14 text-center">
						LIKES RANK
					</p>
					<h3 class="text-first text-success fontsize-44 text-center">
						10th
					</h3>
					
				</div>
			</div>
			<div class="col-lg-3 col-md-6 col-12 mt-3 px-0">
				<div class="box-info bg-white p-4 border-right">
					<p class="note-top fontsize-14 text-center">
						TALKING ABOUT RANK
					</p>
					<h3 class="text-first text-danger fontsize-44 text-center">
					8,786th
					</h3>
					
				</div>
			</div>
			<div class="col-lg-3 col-md-6 col-12 mt-3 px-0" style="padding-right:15px !important">
				<div class="box-info bg-white p-4 border-right">
					<p class="note-top fontsize-14 text-center">
						CATEGORY RANK
					</p>
					<h3 class="text-first text-secondary fontsize-44 text-center">
						A++
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
					<div class="box-chart-likes bg-white" id="chartLikes" style="height:315px">

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
			<div class="col-lg-3 col-md-6 col-12 mt-3 px-0" style="padding-left:15px !important">
				<div class="box-info bg-white p-4 border-right">
					<p class="note-top fontsize-14 text-center">
						top grade
					</p>
					<h3 class="text-first text-info fontsize-44 text-center">
						A++
					</h3>
					
				</div>
			</div>
			<div class="col-lg-3 col-md-6 col-12 mt-3 px-0">
				<div class="box-info bg-white p-4 border-right">
					<p class="note-top fontsize-14 text-center">
						LIKES RANK
					</p>
					<h3 class="text-first text-success fontsize-44 text-center">
						10th
					</h3>
					
				</div>
			</div>
			<div class="col-lg-3 col-md-6 col-12 mt-3 px-0">
				<div class="box-info bg-white p-4 border-right">
					<p class="note-top fontsize-14 text-center">
						TALKING ABOUT RANK
					</p>
					<h3 class="text-first text-danger fontsize-44 text-center">
					8,786th
					</h3>
					
				</div>
			</div>
			<div class="col-lg-3 col-md-6 col-12 mt-3 px-0" style="padding-right:15px !important">
				<div class="box-info bg-white p-4 border-right">
					<p class="note-top fontsize-14 text-center">
						CATEGORY RANK
					</p>
					<h3 class="text-first text-secondary fontsize-44 text-center">
						A++
					</h3>
					
				</div>
			</div>


		</div>
	</div>
	
  </div>
</div>









<script src="../../dist/js/pages/detail.js"></script>