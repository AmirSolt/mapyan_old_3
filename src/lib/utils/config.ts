export const FinalTokenCountLimit = 2000;
export const MaxCompareProducts = 2;
export const MinCompareProducts = 2;








export const ChatGPTTemprature = 0.3 // lower more coherence, higher more creativity
export const ChatGPTInstructions=`
Follow these instructions:
1. Create a comparison table with given products.
2. Come up with 10 features
3. don't use title, asin or brand as a feature.
4. Try to use boolean and number to answer.
5. If answer is boolean use t or f.
6. If answer is string keep it less than 15 characters.
7. NEVER leave a cell empty
8. Example response:
    asin,[feature_name],[feature_name],...
    [asin_value],[feature_value],[feature_value],...
`
