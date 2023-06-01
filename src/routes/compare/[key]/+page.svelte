<script lang="ts">
	import CompareTable from '$lib/comp/compare/compareTable/CompareTable.svelte';
	import LoadingAnim from '$lib/comp/general/loading/LoadingAnim.svelte';
	import BarLoading from '$lib/comp/general/loading/BarLoading.svelte';
	import LoadingContainer from '$lib/comp/general/loading/LoadingContainer.svelte';
	import ResponseCards from '$lib/comp/compare/responseCards.svelte';
	import { userCountry } from '$lib/utils/stores';
	import { destructTableKey } from '$lib/utils/schemas';
	import {convertToTableData} from '$lib/utils/table/init'
	import { error } from '@sveltejs/kit';
	import { SSE } from 'sse.js'
	import { checkProductInfosStore, queryStoresProductInfo } from '$lib/utils/products/api';
	export let data;
	let { chatResponse, tableKey, tableData } = data;
	const { asins } = destructTableKey(tableKey);
	let isProductInfosReady: boolean = false;


	import { onMount } from 'svelte';

	// ============= on load tableData is fetched from db if it doesn't exist generate it =========
	onMount(async () => {
		// if(!tableData){
		// 	awaitProductInfos();
		// }

		let productInfos= [
			{
				"asin": "B09BG5LXWJ",
				"title": "Amazon Fire HD 8 tablet, 8” HD Display, 32 GB, 30% faster processor, designed for portable entertainment, (2022 release), Black 32 GB Standalone Fire HD 8 Black Fire HD 8",
				"image": "https://m.media-amazon.com/images/I/61ExVdn4flL.jpg",
				"price": "$99.99 CAD",
				"brand": "Amazon",
				"link": "https://www.amazon.ca/All-new-Fire-HD-8-tablet/dp/B09BG5LXWJ?tag=mapyan09-20",
				"rating": 4.2,
				"ratings_total": 879,
				"feature_bullets": "Amazon Kids offers easy-to-use parental controls on Fire tablets. Subscribe to Amazon Kids+ for access to thousands of books, popular apps and games, videos, songs, Audible books, and more. Stay connected with family and friends via video calls through apps like Zoom. Fire HD 8 offers 8\" HD display and 2 GB RAM. Choose from 32GB or 64GB (up to 1TB of expandable storage via microSD card). New design is thinner and lighter than previous gen. Screen made with strengthened aluminosilicate glass. As measured in tumble tests, Fire HD 8 is twice as durable as Apple iPad mini (2021). Stream or download your favourite shows and movies from Prime Video, Netflix and Disney+. Enjoy your favourite content from Facebook, Instagram, TikTok, and more through Amazon’s Appstore (Google Play not supported. Subscription for some apps required). All day battery life - Up to 13 hours of reading, browsing the web, watching videos, and listening to music at home and on-the-go. Enhanced performance - Updated hexa-core processor for more responsive performance (up to 30% faster than previous gen Fire HD 8).",
				"reviews": "This is no power pro user tablet. This is good however for watching content in bed or where ever you'd like. I wouldn't buy this to do serious gaming or content creation on. There are far better and more expensive devices by that fruit company to look at for those uses. I'd feel confidant giving this to a child or older person who isn't concerned with top flight specs. On the other hand this does have a good battery life, screen and speakers; especially for something at this price.",
				"ai_keys": [
					"asin",
					"title",
					"price",
					"rating",
					"ratings_total",
					"feature_bullets"
				]
			},
			{
				"asin": "B08F5Z44BV",
				"title": "Amazon Fire HD 10 tablet, 10.1\", 1080p Full HD, 32 GB, latest model (2021 release), Black 32 GB Without Special Offers Black Fire HD 10",
				"image": "https://m.media-amazon.com/images/I/61iE3Yvs2TS.jpg",
				"price": "$159.99 CAD",
				"brand": "Amazon",
				"link": "https://www.amazon.ca/Fire-HD-10-tablet/dp/B08F5Z44BV?tag=mapyan09-20",
				"rating": 4.4,
				"ratings_total": 5423,
				"feature_bullets": "Split screen – All-new feature for Fire OS that shows two compatible apps, like Facebook Messenger and Prime Video, open side by side for easy multitasking. Thinner and lighter than previous generation. Screen made with strengthened aluminosilicate glass. As measured in a tumble test, Fire HD 10 is twice as durable as durable as Samsung Galaxy Tab A8 (2022). Get more done – Check email, update shopping lists, and set reminders. Use your favorite apps like Microsoft Office, OneNote, and Dropbox. Stay connected - Download Zoom to make video calls to friends and family. Enjoy your favorite apps like Netflix, Facebook, Disney+, Instagram, TikTok, and more through Amazon’s Appstore (Google Play not supported. Subscription for some apps required). Brighter display - Vivid 10.1\" 1080p Full HD display is 10% brighter than previous generation, with more than 2 million pixels. Fire HD 10 is almost 20% brighter than Samsung Galaxy Tab A8 (2022). Long-lasting 12-hour battery and 32 or 64 GB internal storage. Add up to 1 TB with microSD (sold separately). Fast and responsive - powerful octa-core processor and 3 GB RAM. 50% more RAM than previous generation.",
				"reviews": "This is now my second FireHD10 Tablet. My first was the 2019 variant and I already felt that was a fantastic value for money. Before I continue, I will preface this by saying this review may get a little long, but I really feel that many things about Amazon Fire products need clarification as there is just so much misinformation and even outright falsehoods dished out about them.. even from some “Reviewers” on this very page. I hope I can provide some beneficial points for anyone taking their time to go through this. Ok, lets begin...  I hate to admit that I am a former Apple fanboy and I cannot stress how much I have come to rely on all of my new Amazon Fire & Smart Products. My first trial experience was picking up a FireHD8 along with a regular FireTV Stick when on sale during the July 2019 Canada Prime Day. Now, I have an additional 3 additional FireTV Sticks (4K versions), a Fire Cube, Echo Show 8,Echo Show 5, this brand new HD10 64GB 2021 variant along with my original HD10 and still growing! I could go on forever about all of my new hardware but the bottom line is that all of these Amazon Fire and smart products are an outstanding value in relation to competing products and can literally save you $1,000's over Apple products!!. If I were running multiple iPads and Apple hardware in my home in an attempt to try to recreate what I get out of my Amazon product ecosystem the cost would be more than what I have spent on Amazon gear by a factor of 7! This is no exaggeration.  This newer HD10 really feels a lot “snappier” than my current 10inch and I already thought that was a great tablet. To me, the responses when using the newer HD10 are lightning quick. This of course is due in part to the newer model having an additional 1GB of memory bringing the total to 3GB vs. 2GB in the prior generation. Also, you can now add a whopping 1TB of additional internal Storage via use of your own optional microSD cards. Previously, this was 500GB in prior versions. The newer HD10 also has a slightly smaller footprint than previous with a thinner frame bezel all around the display screen. I like this touch very much.  Another very welcome change is the shifting of the internal front facing camera to the upper center of the unit from its previous side position. During the age of Global Pandemics and so many of us now working remotely and “zooming” for multiple hours daily, this simple little change makes teleconferencing so much easier and more natural. You are no longer having to twist and contort getting yourself properly framed for a call. A very welcome change indeed.  Also of note is the newer version has BlueTooth 5.0 vs. 4.2 in the 2019 variant and the rear camera has also now been bumped up to a 5 Megapixel unit from the prior 2 Megapixel one. Admittedly though, Fire HD’s have never had a particularly good internal camera but that may be completely irrelevent to many.  If you are a Prime Member (and honestly if you regulary use Amazon how wouldn’t you be at this point at only $79 annually?) you cannot go wrong with any of these items as they are of course optimized for consuming Prime Video, Amazon Music and Prime Reading and will get you into Smart Home control and camera usage with minimal effort.  As with prior thoughts on my previous HD8 and HD10, my only real gripe with Fire Tablets is that they don’t have GPS embedded, so they are therefore NOT suited for standalone external satellite navigation use...but I got over that! These are best suited for use within your home environment or taking on trips once you have locally downloaded all of the video, music and reading content to satisfy yourself or the wee ones while away. ((Unlike iPads, remember that you have a microSD slot on Fire Tabs allowing you to add up to 1TB of your own additional internal storage!))  All in all, these are amazing pieces of hardware to satisfy the media consumption needs for your whole family. And, they make fantastic choices for giving to children for their “kids needs” because they are simple to operate, are relatively SAFE due to the ease at which you can set Parental controls and their buy-in costs relative to competing products is such that if your kids somehow manage to smash them.. and you know they eventually just might.. cuz...KIDS!,you are not going to cry too much about it. Now,try to say that about a $400 or $500 iPad!  And now to a question that is on many a mind and the one relating to the most misinformation about these products...for all those who think these are “too restrictive” and wont let me do this or that... \"waaaaaah... waaaaaah... waaaaah..\", just take a close look at some of the app icon’s showing in my attached screenshot pics. It IS ABSOLUTELY POSSIBLE to unlock the Google Play Store with minimal effort! I included a shot of the screen image after applying the Google PlayStore on my newly unpacked Fire10 and just prior to starting to add Google store applications. Among other things I have been able to add Bell FibeTV,KODI, the official YouTube app, Ebay, Firefox, Home Automation apps, Microsoft productivity apps, Google apps and on and on. I have always been able to do this to ALL of my previous Fire Tabs as well. The ability to do this has always been available to you unlike what many out there try to claim. It is simply NOT true.  But, having said that it may not even be necessary. If what you require out of a Tablet is to simply just be able to do things like access your Prime Video and Amazon Music streaming, read your Kindle books, or check your Facebook page, use Messenger, Twitter, TikTok, watch Netflix, Disney+, play some games, etc., etc.,You can already do that just with what is already available in the Amazon Store and pre-installed on the HD10. Just remember that you CAN add the Google Play Store in future if you choose to... Enough said!  AAA+  Edit: **Hint.. all you need to do to learn how to accomplish what I have I mentioned is to do a simple search with the following word string while in YouTube..”Install Google Play Fire HD”. All you need to know will be contained within the first one or two video hits you see. ENJOY!.  Further, If you managed to make it this far and you learned something new or found this review to be beneficial, I will kindly make a request.. Please consider clicking the “HELPFUL” button to help advance this review. I obviously will not get anything out of this other than knowing that my ramble may have helped someone. HAVE A GREAT DAY!**",
				"ai_keys": [
					"asin",
					"title",
					"price",
					"rating",
					"ratings_total",
					"feature_bullets"
				]
			}
		]
		getTableData(productInfos);
		getChatResponse(productInfos);
	});

	// ============== waits for productinfos to download then starts the process ====================
	function awaitProductInfos() {
		if (!checkProductInfosStore(asins, $userCountry)) {
			window.setTimeout(awaitProductInfos, 100);
		} else {
			isProductInfosReady = true;
			console.log("product infos loaded")

			let productInfos = asins.map((asin) => queryStoresProductInfo(asin, $userCountry));
			
			console.log(productInfos)
			getTableData(productInfos);
			getChatResponse(productInfos);
		}
	}

	// ============== title ====================
	async function saveCompare(){
		const response = await fetch('/api/db/save-compare', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            tableKey,
            tableData,
            chatResponse,
        })
		});
		
		if (!response.ok) {
			const data = await response.json();
			console.log(data)
			throw error(400, `failed to save table Data:${data.toString()}`);
		}
	}

	// ============== generates tabledata from prodocts and saves it ====================
	function getTableData(productInfos) {
		tableData = convertToTableData(productInfos)
	}


	// ============== streams chatgpt response ====================
	async function getChatResponse(productInfos){

		function handleError<T>(err: T) {
			chatResponse = "Something went wrong!"
			console.error(err)
		}

		const eventSource = new SSE('/api/chat', {
			headers: {
				'Content-Type': 'application/json'
			},
			payload: JSON.stringify({ productInfos})
		})

		eventSource.addEventListener('error', handleError)
		eventSource.addEventListener('message', (e) => {
			try {
				if (e.data === '[DONE]') {
					// saveCompare()
					return
				}
				
				const completionResponse = JSON.parse(e.data)
				const [{ delta }] = completionResponse.choices
				
				if (delta.content) {
					chatResponse = (chatResponse ?? '') + delta.content

				}
			} catch (err) {
				handleError(err)
			}
		})
		eventSource.stream()
	}




</script>







{#if !tableData }

	<LoadingContainer >
		<LoadingAnim />
		<br>
		<BarLoading>
			<br />
			<div class="flex flex-col justify-center items-center text-center">
				<p class="text-2xl">Generating a comparison table</p>
				<br />
				<p>We are working to improve the loading speed.</p>
				<p>Thank you for being patient.</p>
			</div>
		</BarLoading>
	</LoadingContainer>

{:else}
	<p class="text-sm">
		*This information has been generated with the help of AI, and has not been confirmed by a human.
	</p>

	<br />
	<hr />
	<br />

	{#if chatResponse}
		<ResponseCards rawResponse={chatResponse} {tableData}/>
	{/if}
	<br>

	<CompareTable {tableData} />
{/if}
