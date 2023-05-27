export const FinalTokenCountLimit = 2000;
export const MaxCompareProducts = 2;
export const MinCompareProducts = 2;








export const ChatGPTTemprature = 0.3 // lower more coherence, higher more creativity
export const ChatGPTInstructions=`
Follow these instructions:
1. Create a comparison table.
2. Come up with 15 keywords that 
3. Answer the features based on information in PRODUCTS.
6. Don't use title, product name or price as a feature.
7. For every feature, Only give the best product: "DW"
8. For every feature, Only give the worst product: "DW"
9. If not sure answer with: "DQ"
10. ONLY use "DW" and "DL" once per row.
11. ONLY answer with "DW", "DQ" and "DL"
12. ONLY answer in csv.
13. Example response:
    asin,[feature_name],[feature_name],...
    [asin_value],[answer].[answer]....
`
