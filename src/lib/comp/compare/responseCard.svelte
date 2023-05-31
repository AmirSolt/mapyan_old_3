<script lang='ts'>
	import ProductAvatar from '$lib/comp/general/product/ProductAvatar.svelte';
	import StarRating from '$lib/comp/general/product/StarRating.svelte';

    export let tableData:{};
    export let rawResponse;

    let results = convertChatResponse(rawResponse, tableData)


    function convertChatResponse(rawResponse:string, tableData){
        rawResponse = rawResponse.trim().replace(/(\r\n|\n|\r)/gm, "")
      

        let r = rawResponse.split("%").map(t=>{
            return t.trim()
        })

        r = r.filter(t=>t.length>0)

        let dimArray = r.reduce((a, c, i) => {
            return i % 2 === 0 ? a.concat([r.slice(i, i + 2)]) : a;
            }, []);

        let final = []
        dimArray.forEach((item, i)=>{
            tableData[item[0]]["chatResponse"] = item[1]
            final.push(tableData[item[0]])
        })

        return final
    }
    function truncate(text:string, size:number){
		return text.substring(0,size) + " ...";
	}
   


    

</script>


{#each results as item, i}


    <div class="card flex flex-col justify-center items-start gap-4 p-2">

        <div class="flex justify-center items-center p-2">
            <a class="" href={item.link} target="_blank" rel="noopener">
                <ProductAvatar imageUrl={item.image} size={24} />
            </a>
            
            <div class="flex flex-col justify-center items-start mx-4">
                <!-- INFO -->
                <div class="">
                    <span>
                        Brand: {item.brand}
                    </span>
                </div>
                <a class="" href={item.link} target="_blank" rel="noopener">
                    <span >
                        {truncate(item.title, 25)}
                    </span>
                </a>
                <div class="flex justify-center items-center">
                    <StarRating rating={item.rating} starSize={4} />
                    <small class="mx-2">({item.ratings_total})</small>
                </div>
                <div class="">
                    <span>
                        {item.price}
                    </span>
                </div>

            </div>

        </div>
        
        <div class="p-2">

            <p>
                {item.chatResponse}
            </p>
        </div>
    </div>
 

    <br>

{/each}