function getPageOf(list, pageItemCount, pageIndex){
	let items = list.filter((item, index)=>
		index >= pageIndex * pageItemCount 
		&& index < (pageIndex + 1) * pageItemCount);
	let page ={items};
	page.pageIndex = pageIndex;
	page.pageCount = Math.floor(list.length / pageItemCount) + 1;
	return page;
}

export default {
	getPageOf
}