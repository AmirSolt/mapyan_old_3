interface Price{
	symbol:string;
	value:number;
	currency:string;
}
interface Product{
	asin:string;
	image:string;
	brand:string;
	link:string;
	title:string;
	rating:number;
	ratings_total:number;
	prices:Price[];
	price:Price;
}
interface ProductInfo{
    asin:string;
    title:string;
    image:string;
    price:Price;
    brand:string;
    link:string;
    rating:number;
    ratings_total:number;
    feature_bullets:string;
}
interface CompactProductInfo{
    asin:string;
    title:string;
    image:string;
    price:Price;
    brand:string;
    link:string;
    rating:number;
    ratings_total:number;
}




interface CompareCard{
	heading:string;
	items:CompareCardItem[];
}
interface CompareCardItem{
	asin:string;
	paragraph:string;
}
