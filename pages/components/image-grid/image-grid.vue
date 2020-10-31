<template>
	<view class="image-grid-container">
		<view class="grid grid-square" :class="'col-' + colCount">
			<view   v-for="(image,index) in images" :key="index">
				<image class="image-grid-image loading" :src="imageUrl(image)" mode="aspectFill" @click="onPreviewImage(index)"></image>
				<view v-if="editable" class="image-grid-remove-image" @click="removeImage(index)">X</view>
			</view>
			<view v-if="editable && this.restImageCount > 0" class="image-grid-add-image">
				<view @click="addImage">
					<view class="image-grid-add-image-text">+</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			images:{
				type: Array,
				defalut: []
			},
			baseUrl:{
				type: String,
				default: ""
			},
			cols: {
				type: Number,
				default: 3,
				validator: function(value){
					return value >= 1 && value <= 5;
				}
			},
			editable: {
				type: Boolean,
				default: false
			},
			maxImagesCount: {
				type: Number,
				default: 9,
				validator: function(value){
					return value >= 1;
				}
			}
		},
		data() {
			return {
				
			}
		},
		watch:{
			images: function(newVal, oldVal){
				if(!newVal)
					this.images = [];
			}
		},
		computed:{
			colCount(){
				if(this.editable)
					return this.cols;
				if(!this.images)
					return 1;
				return Math.min(this.images.length, this.cols);
			},
			restImageCount(){
				if(!this.images)
					return this.maxImagesCount;
				return this.maxImagesCount - this.images.length;
			}
		},
		methods: {
			imageUrl(imageUrl){
				return this.baseUrl + imageUrl;
			},
			onPreviewImage(index){
				uni.previewImage({
					current:index,
					urls: this.images
					}
				);
			},
			addImage(){
				if(this.restImageCount <= 0){
					uni.showToast({
						title: "已达到最大个数",
						duration: 1000
					})
					return;
				}
				uni.chooseImage({
					count: this.restImageCount,
					success: (res) => {
						res.tempFilePaths.forEach(path=>{
							this.images.push(path);
						})
					}
				})
			},
			removeImage(index){
				this.images.splice(index,1);
			},
		}
	}
</script>

<style scoped>
	.image-grid-container{
		width: 100%;
		margin-top: 10upx;
	}
	.grid.col-1.grid-square > view {
		padding-bottom: 60%;
	}
	.image-grid-image{
		position: absolute;
		width:100%;
		height:100%;
		top: 0;
	}
	.image-grid-remove-image{
		position: absolute;
		right: 15upx;
		top: 15upx;
		z-order: 100;
		font-size: 40upx;
		font-weight: 300;
		color: #2e2e2e;
	}
	.image-grid-add-image view{
		position: absolute;
		top: 0;
		width:100%;
		height:100%;
		display: flex;
		align-items: center;
		justify-content:center;
		
	}
	.image-grid-add-image-text{
		font-size: 100upx;
		font-weight: 550;
		text-align: center;
		color: #2e2e2e;
	}
</style>
