# One Page Site – Developer Notes  
**Student ID:** U3292103
**Topic:**The Deep Ocean 


## Project Background
This project was my second attempt at building a website — and my first time using JavaScript. I expected it to be complex, so I started right after finishing Assessment 2. While I was already familiar with HTML and CSS, adding JavaScript required much more logical thinking and careful structure planning. Many functions conflicted because of the site’s multiple animations and interactive elements, but through constant testing and revision, I managed to make everything work smoothly.

I chose the Deep Ocean theme simply because I’ve always loved swimming at the beach, yet never truly understood the ocean itself. This project gave me the chance to learn more about it while improving my web development skills. 



## Design Intent
When designing the layout, I examined several ocean-themed websites, particularly [**The Deep Sea** by Neal.fun](https://neal.fun/deep-sea/), which informed my approach to creating an immersive scrolling experience. I implemented gradient transitions that shift from light to dark blue and incorporated ocean imagery to simulate a gradual descent beneath the sea. The header design was influenced by [**Superjuice** from One Page Love](https://iamsuperjuice.com/?ref=onepagelove), whose clean and memorable layout supports intuitive navigation across a long one-page interface. To encourage active participation, I included a quiz and feedback section to enhance user engagement. Throughout the design process, I applied key UX principles outlined by Don Norman — focusing on **visibility**, **feedback**, and **consistency** — to ensure users maintained orientation, received immediate responses, and experienced a coherent interface throughout the site.  



## Development Process
The website was developed incrementally, section by section. I first constructed the HTML framework using semantic tags and clear IDs to ensure reliable linking and scrolling. Once the layout was stable, I applied CSS styling with flexbox and grid systems, created gradient backgrounds, and tested spacing with temporary outlines. Only then did I integrate JavaScript into each section, using small, self-contained scripts within IIFEs and helper functions such as a custom `throttle()`.

For example,When adding scroll-based effects to the ocean section, I noticed lag from too many scroll triggers. After watching How to Throttle Scroll Events in JavaScript (Web Dev Simplified, 2020), I learned to limit event frequency for smoother performance. I tested each change with console logs, disabled transitions to locate bugs, and verified results through click and scroll interactions.

I studied several JavaScript and SVG animation tutorials, including SVG Wave Animation with requestAnimationFrame (Franks Laboratory, 2021) and Intersection Observer in JavaScript (Kevin Powell, 2022), which taught me how browser APIs enhance animation smoothness. Some methods didn’t fit my structure, so I adapted and rewrote parts of the logic. This trial-and-error process improved my reasoning and debugging skills, helping me fix issues more efficiently.


## Technical Challenges and Solutions
For the wave animation, I first attempted a CSS-only method by keyframing the background position of an SVG. However, this proved ineffective, as CSS cannot alter an SVG’s internal path geometry, leaving the wave static. After experimenting, I replaced this with an inline SVG embedded directly in the HTML, using CSS for base styling and JavaScript to dynamically update the `path d` values through `requestAnimationFrame`. This created a more fluid and realistic wave motion while maintaining cross-device performance efficiency.   

A major issue was the navigation “bounce.” Both click events and the scroll spy updated the header at once, making it unstable. I fixed this by throttling the scroll handler, separating click feedback, and simplifying transitions. When the header later covered section titles, I used scroll-margin-top for spacing and added a pageshow event to reset animations from cache. Using console.log() and ChatGPT to trace logic errors improved my understanding of how structure, style, and behaviour interact, and greatly sped up my debugging.



## Self-Reflection
Through building this full website and discussing it with my tutor Riley, I realised there are still many areas I can improve — especially in maintaining visual consistency and creating smoother transitions between sections. For example, I learned the importance of unifying font sizes and styles to make the site feel more cohesive. Although there are still things I couldn’t fully achieve this time, the project was a valuable experience that helped me understand how much thought and coordination go into web design and development.


## Future Improvements
If I had more time, I would like to add more advanced interactive effects to enhance the immersive atmosphere — for example, implementing **parallax scrolling** to give a stronger sense of depth, or integrating **subtle ambient sound** that reacts as users scroll through different ocean zones. I would also like to experiment with **GSAP** or **WebGL-based** motion effects to make waves and particles behave more organically, and explore **scroll-triggered storytelling**, where text and visuals evolve dynamically with user movement. These additions would further enrich the sensory experience while keeping the focus on performance and accessibility.  

--------------------------------------------------------------------------------------------------------------------------------

## Learning References
- easings.net. (n.d.). *Easing Functions Cheat Sheet.* Retrieved October 7, 2025, from [https://easings.net](https://easings.net)  
- MDN Web Docs. (n.d.). *CanvasRenderingContext2D – globalAlpha, fillStyle.* Retrieved October 7, 2025, from [https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D)  
- MDN Web Docs. (n.d.). *Element.scrollIntoView()* – Web APIs. Retrieved October 7, 2025, from [https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView)  
- MDN Web Docs. (n.d.). *Intersection Observer API.* Retrieved October 7, 2025, from [https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)  
- MDN Web Docs. (n.d.). *prefers-reduced-motion – CSS Media Feature.* Retrieved October 7, 2025, from [https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)  
- MDN Web Docs. (n.d.). *SVG Path d attribute.* Retrieved October 7, 2025, from [https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d)  
- MDN Web Docs. (n.d.). *Window: requestAnimationFrame().* Retrieved October 7, 2025, from [https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)  
- Neal.fun. (n.d.). *The Deep Sea.* Retrieved from [https://neal.fun/deep-sea/](https://neal.fun/deep-sea/)  
- Norman, D. (2013). *The Design of Everyday Things: Revised and Expanded Edition.* Basic Books.  
- Superjuice. (n.d.). *Website reference (One Page Love).* Retrieved from [https://iamsuperjuice.com/?ref=onepagelove](https://iamsuperjuice.com/?ref=onepagelove)  
- W3C WAI-ARIA Authoring Practices Guide (APG). (n.d.). *Modal Dialog Example.* Retrieved October 7, 2025, from [https://www.w3.org/WAI/ARIA/apg/patterns/dialogmodal/examples/dialog/](https://www.w3.org/WAI/ARIA/apg/patterns/dialogmodal/examples/dialog/)  
- W3Schools. (n.d.). *How TO – Scrollspy.* Retrieved from [https://www.w3schools.com/howto/howto_js_scrollspy.asp](https://www.w3schools.com/howto/howto_js_scrollspy.asp)  
- Web Dev Simplified. (2020, May 14). *How to Throttle Scroll Events in JavaScript* [Video]. YouTube. [https://www.youtube.com/watch?v=F1anRyL37lE](https://www.youtube.com/watch?v=F1anRyL37lE)  
- Web Dev Simplified. (2023, March 12). *Build a Scroll Animation with JavaScript* [Video]. YouTube. [https://www.youtube.com/watch?v=T33NN_pPeNI](https://www.youtube.com/watch?v=T33NN_pPeNI)  
- Franks Laboratory. (2021, August 6). *SVG Wave Animation with requestAnimationFrame* [Video]. YouTube. [https://www.youtube.com/watch?v=6KSLg0XzZek](https://www.youtube.com/watch?v=6KSLg0XzZek)  
- Kevin Powell. (2022, October 5). *Intersection Observer in JavaScript – Scroll Animations Made Easy* [Video]. YouTube. [https://www.youtube.com/watch?v=2IbRtjez6ag](https://www.youtube.com/watch?v=2IbRtjez6ag)  


## picture References
Introduction:
- BBC Earth. (2015, August 28). *The deep ocean: Earth's final frontier* [Video]. YouTube. [https://www.youtube.com/watch?v=UwVNkfCov1k](https://www.youtube.com/watch?v=UwVNkfCov1k)

Mesopelagic Zone:
- National Marine Sanctuary Foundation. (n.d.). *Sea wonder: Lanternfish*. Marine Sanctuary Foundation. [https://marinesanctuary.org/blog/sea-wonder-lanternfish/](https://marinesanctuary.org/blog/sea-wonder-lanternfish/)  
- Australian Museum. (n.d.). *Sloane’s viperfish (Chauliodus sloani)*. Australian Museum. [https://australian.museum/learn/animals/fishes/sloanes-viperfish-chauliodus-sloani/](https://australian.museum/learn/animals/fishes/sloanes-viperfish-chauliodus-sloani/)

Bathypelagic Zone:
- Yale University. (2024, May 23). *Sea love behind unusual sexual parasitism in deep-water anglerfish*. *Yale News.* [https://news.yale.edu/2024/05/23/sea-love-behind-unusual-sexual-parasitism-deep-water-anglerfish](https://news.yale.edu/2024/05/23/sea-love-behind-unusual-sexual-parasitism-deep-water-anglerfish)  
- Gannon, M. (n.d.). *Giant squid*. *Live Science.* [https://www.livescience.com/giant-squid.html](https://www.livescience.com/giant-squid.html)

Abyssopelagic Zone:
- Fourth Element. (n.d.). *Abyss collection*. Fourth Element. [https://fourthelement.com.au](https://fourthelement.com.au)  
- Wikipedia contributors. (n.d.). *Grimpoteuthis*. *Wikipedia, The Free Encyclopedia.* Retrieved October 8, 2025, from [https://en.m.wikipedia.org/wiki/Grimpoteuthis](https://en.m.wikipedia.org/wiki/Grimpoteuthis)

Hadalpelagic Zone:
- Alchetron. (n.d.). *Amphipoda*. *Alchetron, The Free Social Encyclopedia.* [https://alchetron.com/Amphipoda](https://alchetron.com/Amphipoda)  
- Phys.org. (2023, June). *Scientists reveal some of the deepest sea dwellers on Earth*. *Phys.org.* [https://phys.org/news/2023-06-scientists-reveal-deepest-sea-dwellers.html](https://phys.org/news/2023-06-scientists-reveal-deepest-sea-dwellers.html)

Ecosystems and Environmental Context:
- Business Insider. (2019, June). *Plastic pollution: Microplastics pervade surface to deep ocean*. *Business Insider.* [https://www.businessinsider.com/plastic-pollution-microplastics-pervade-surface-deep-ocean-2019-6](https://www.businessinsider.com/plastic-pollution-microplastics-pervade-surface-deep-ocean-2019-6)  
- Purser, A., et al. (2018). *Ecosystem structure and function of the deep sea*. *Science, 359*(6371), 791–795. [https://www.science.org/doi/10.1126/science.aah7178](https://www.science.org/doi/10.1126/science.aah7178)

Deep-Sea Mining:
- Metal Tech News. (2024, September 16). *The changing tides of deep-sea mining*. *Metal Tech News.* [https://www.metaltechnews.com/story/2024/09/16/critical-minerals-alliances-2024/the-changing-tides-of-deep-sea-mining/1916.html](https://www.metaltechnews.com/story/2024/09/16/critical-minerals-alliances-2024/the-changing-tides-of-deep-sea-mining/1916.html)



## Deep Ocean Knowledge References  
- Marine Sanctuary. (n.d.). *Sea Wonder: Lanternfish.* Retrieved October 8, 2025, from [https://marinesanctuary.org/blog/sea-wonder-lanternfish/](https://marinesanctuary.org/blog/sea-wonder-lanternfish/)  
- Australian Museum. (n.d.). *Sloane’s Viperfish (*Chauliodus sloani*).* Retrieved October 8, 2025, from [https://australian.museum/learn/animals/fishes/sloanes-viperfish-chauliodus-sloani/](https://australian.museum/learn/animals/fishes/sloanes-viperfish-chauliodus-sloani/)  
- Yale News. (2024, May 23). *The sea love behind unusual sexual parasitism in deep-water anglerfish.* Retrieved October 8, 2025, from [https://news.yale.edu/2024/05/23/sea-love-behind-unusual-sexual-parasitism-deep-water-anglerfish](https://news.yale.edu/2024/05/23/sea-love-behind-unusual-sexual-parasitism-deep-water-anglerfish)  
- Live Science. (n.d.). *Giant squid.* Retrieved October 8, 2025, from [https://www.livescience.com/giant-squid.html](https://www.livescience.com/giant-squid.html)  
- Fourth Element Australia. (n.d.). *Abyss – Dive deeper.* Retrieved October 8, 2025, from [https://fourthelement.com.au](https://fourthelement.com.au)  
- Wikipedia. (n.d.). *Grimpoteuthis.* Retrieved October 8, 2025, from [https://en.m.wikipedia.org/wiki/Grimpoteuthis](https://en.m.wikipedia.org/wiki/Grimpoteuthis)  
- Alchetron. (n.d.). *Amphipoda.* Retrieved October 8, 2025, from [https://alchetron.com/Amphipoda](https://alchetron.com/Amphipoda)  
- Phys.org. (2023, June). *Scientists reveal deepest sea dwellers.* Retrieved October 8, 2025, from [https://phys.org/news/2023-06-scientists-reveal-deepest-sea-dwellers.html](https://phys.org/news/2023-06-scientists-reveal-deepest-sea-dwellers.html)  
