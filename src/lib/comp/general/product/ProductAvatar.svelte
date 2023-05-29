<script lang='ts'>
    export let imageUrl:string = "";
    export let size:number = 16;
</script>


<div>

    <div class="flex justify-center items-center bg-white w-{size} h-{size} md:w-24 md:h-24 p-1  rounded-lg">
    
        <!-- <Avatar src={imageUrl} width="w-full" rounded="rounded-full" /> -->
    
        <img  class="max-w-full max-h-full rounded-lg" src={imageUrl} alt="Product Avatar">
    </div>
</div>