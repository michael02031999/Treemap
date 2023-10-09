var svg = d3.select("svg")
const width = +svg.attr("width");
const height = +svg.attr("height");

svg.append('text')
    .text("Video Game Sales")
    .attr('x', width/3 + 100)
    .attr('y', 0)
    .attr('font-size', '50px')
    .attr('font-weight', 'bold')

svg.append('text')
    .text("Top 100 Most Sold Video Games Grouped by Platform")
    .attr('x', width/3 )
    .attr('y', 50)
    .attr('font-size', '25px')

async function retrieveSales() {
    const response = await fetch('https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json')
    const videoGameSales = await response.json();
    console.log(videoGameSales)

    //console.log(treemap);

    const root = d3.hierarchy(videoGameSales)
        .sum(function(d){return d.value})
        .sort((a,b) => {return b.value - a.value})
    
    console.log(root);

    d3.treemap()
        .size([width-200, height - 225])
        (root)

    var tooltip = d3.select('body').append("div")
        .attr("class", 'tooltip')
        .style("opacity", 1)
        .attr('width', '20px')
        .attr('height', '20px')
        .style('position', "absolute")
        .style('background', "rgb(245, 251, 203)")
        .style('padding', "20px")
        .style("border-radius", "10px")

    //console.log(div);

    


    svg.selectAll('rect').data(root.leaves())
        .enter().append('rect')
            .attr('x', d => {
                //console.log(d)
                return d.x0
            })
            .attr('y', d => {return d.y0})
            .attr('width', d => { return d.x1 - d.x0 })
            .attr('height', d => { return d.y1 - d.y0 })
            .style("stroke", 'black')
            .style('fill', d => {

                if (d.data.category == "Wii") {
                    return ("rgb(81, 133, 187)")
                }
                else if (d.data.category == "NES") {
                    return ("rgb(168, 227, 149)")
                }
                else if (d.data.category == "GB") {
                    return ("rgb(248, 195, 137)")
                }
                else if (d.data.category == "DS") {
                    return ("rgb(185, 202, 234)")
                }
                else if (d.data.category == "X360") {
                    return ("rgb(244, 144, 59)")
                }
                else if (d.data.category == "PS3") {
                    return ("rgb(86, 172, 74)")
                }
                else if (d.data.category == "PS2") {
                    return ("rgb(206, 71, 77)")
                }
                else if (d.data.category == "SNES") {
                    return ("rgb(202, 183, 216)")
                }
                else if (d.data.category == "GBA") {
                    return ("rgb(223, 132, 201)")
                }
                else if (d.data.category == "PS4") {
                    return ("rgb(158, 118, 195)")
                }
                else if (d.data.category == "3DS") {
                    return ("rgb(247, 163, 163)")
                }
                else if (d.data.category == "N64") {
                    return ("rgb(198, 167, 160)")
                }
                else if (d.data.category == "PS") {
                    return ("rgb(148, 109, 100)")
                }
                else if (d.data.category == "XB") {
                    return ("rgb(243, 188, 215)")
                }
                else if (d.data.category == "PC") {
                    return ("rgb(142, 142, 142)")
                }
                else if (d.data.category == "PSP") {
                    return ("rgb(191, 198, 68)")
                }
                else if (d.data.category == "2600") {
                    return ("rgb(204, 204, 204)")
                }
                else {
                    return ('rgb(220, 224, 154)')
                }
            })
            .attr('transform', "translate(100,100)")
            .on("mousemove", function(d) {
                console.log(d);
                tooltip.style("opacity", 1)
                tooltip.style("left", d.pageX + 50 + 'px')
                tooltip.style("top", d.pageY - 100 + "px")
                tooltip.style("display", "inline-block")
                tooltip.html(`Name: ${d.target.__data__.data.name}
                <br />Category: ${d.target.__data__.data.category}
                <br />Value: ${d.target.__data__.data.value}`)
            })
            .on("mouseout", function(d) {
                tooltip.style("opacity", 0)
            })
            


        //d3.select("rect").append("div").text("Appending new div tag")

        var texts = svg.selectAll('g')
            .data(root.leaves())
            .enter();
       
        texts.append("text")
            .attr("x", function(d){ return d.x0+5})    // +10 to adjust position (more right)
            .attr("y", function(d){ return d.y0+12})    // +20 to adjust position (lower)
            .text( d => {
                console.log(d);
                console.log(d.data.name)
                let temp = d.data.name.split(/(?=[A-Z][^A-Z])/g)
                console.log(temp);
                return temp[0]
            }) 
            .attr("font-size", "15px")
            .attr("fill", "black")
            .attr('transform', "translate(100,100)")

        texts.append("text")
              .attr("x", function(d){ return d.x0+5})    // +10 to adjust position (more right)
              .attr("y", function(d){ return d.y0+27})    // +20 to adjust position (lower)
              .text( d => {
                //console.log(d);
                let temp2 = d.data.name.split(/(?=[A-Z][^A-Z])/g)
                //console.log(temp2);
                return temp2[1]
              }) 
              .attr("font-size", "15px")
              .attr("fill", "black")
              .attr('transform', "translate(100,100)")
              

        texts.append("text")
              .attr("x", function(d){ return d.x0+5})    // +10 to adjust position (more right)
              .attr("y", function(d){ return d.y0+42})    // +20 to adjust position (lower)
              .text( d => {
                let temp3 = d.data.name.split(/(?=[A-Z][^A-Z])/g)
                //console.log(temp3)
                return temp3[2]
              }) 
              .attr("font-size", "15px")
              .attr("fill", "black")
              .attr('transform', "translate(100,100)")
              .style('opacity', d => {
                //console.log(d);               
                if (d.y1 - d.y0 < 50) {
                    return 0
                }
              })

        texts.append("text")
              .attr("x", function(d){ return d.x0+5})    // +10 to adjust position (more right)
              .attr("y", function(d){ return d.y0+57})    // +20 to adjust position (lower)
              .text( d => {
                let temp4 = d.data.name.split(/(?=[A-Z][^A-Z])/g)
                return temp4[3]
              }) 
              .attr("font-size", "15px")
              .attr("fill", "black")
              .attr('transform', "translate(100,100)")
              .style('opacity', d => {
                //console.log(d);
                if (d.y1 - d.y0 < 75) {
                    return 0
                }
              })
              

        texts.append("text")
              .attr("x", function(d){ return d.x0+5})    // +10 to adjust position (more right)
              .attr("y", function(d){ return d.y0+72})    // +20 to adjust position (lower)
              .text( d => {
                let temp5 = d.data.name.split(/(?=[A-Z][^A-Z])/g)
                return temp5[4]
              }) 
              .attr("font-size", "15px")
              .attr("fill", "black")
              .attr('transform', "translate(100,100)")
              .style('opacity', d => {
                //console.log(d);
                if (d.y1 - d.y0 < 75) {
                    return 0
                }
              })

        texts.append("text")
              .attr("x", function(d){ return d.x0+5})    // +10 to adjust position (more right)
              .attr("y", function(d){ return d.y0+87})    // +20 to adjust position (lower)
              .text( d => {
                let temp5 = d.data.name.split(/(?=[A-Z][^A-Z])/g)
                return temp5[5]
              }) 
              .attr("font-size", "15px")
              .attr("fill", "black")
              .attr('transform', "translate(100,100)") 
              .style('opacity', d => {
                //console.log(d);

                if (d.y1 - d.y0 < 150) {
                    return 0
                }
              })
              

        var g = svg.append('g')
              .attr('transform', 'translate(400, 900)')

        //Legend -- Wii

        g.append("rect")
              .attr("width", 20)
              .attr("height", 20)
              .attr("x", 40)
              .attr("y", 0)
              .attr("fill",  "rgb(81, 133, 187)") 

        g.append('text')
              .attr('x', 70)
              .attr('y', 17)
              .text( "Wii")
              .attr('font-size', "20px")

        //Legend -- GB

        var g1 = svg.append('g')
            .attr('transform', "translate(100,100)")
        
        g.append("rect")
              .attr("width", 20)
              .attr("height", 20)
              .attr("x", 40)
              .attr("y", 40)
              .attr("fill",  "rgb(248, 195, 137)") 

        g.append('text')
              .attr('x', 70)
              .attr('y', 55)
              .text( "GB")
              .attr('font-size', "20px")

        //Legend PS2

        g.append("rect")
            .attr("width", 20)
            .attr("height", 20)
            .attr("x", 40)
            .attr("y", 80)
            .attr("fill",  "rgb(206, 71, 77)") 

        g.append('text')
            .attr('x', 70)
            .attr('y', 95)
            .text( "PS2")
            .attr('font-size', "20px")

        //Legend SNES

        g.append("rect")
            .attr("width", 20)
            .attr("height", 20)
            .attr("x", 40)
            .attr("y", 120)
            .attr("fill",  "rgb(202, 183, 216)") 

        g.append('text')
            .attr('x', 70)
            .attr('y', 136)
            .text( "SNES")
            .attr('font-size', "20px")

        //Legend GBA

        g.append("rect")
            .attr("width", 20)
            .attr("height", 20)
            .attr("x", 40)
            .attr("y", 160)
            .attr("fill",  "rgb(223, 132, 201)") 

        g.append('text')
            .attr('x', 70)
            .attr('y', 175)
            .text( "GBA")
            .attr('font-size', "20px")

        //Legend 2600

        g.append("rect")
            .attr("width", 20)
            .attr("height", 20)
            .attr("x", 40)
            .attr("y", 200)
            .attr("fill",  "rgb(204, 204, 204)") 

        g.append('text')
            .attr('x', 70)
            .attr('y', 215)
            .text( "2600")
            .attr('font-size', "20px")

        //Legend DS

        g.append("rect")
            .attr("width", 20)
            .attr("height", 20)
            .attr("x", 320)
            .attr("y", 0)
            .attr("fill",  "rgb(185, 202, 234)") 

        g.append('text')
            .attr('x', 350)
            .attr('y', 15)
            .text( "DS")
            .attr('font-size', "20px")

        //Legend PS3

        g.append("rect")
            .attr("width", 20)
            .attr("height", 20)
            .attr("x", 320)
            .attr("y", 40)
            .attr("fill",  "rgb(86, 172, 74)") 

        g.append('text')
            .attr('x', 350)
            .attr('y', 56.5)
            .text( "PS3")
            .attr('font-size', "20px")

        //Legend 3DS

        g.append("rect")
            .attr("width", 20)
            .attr("height", 20)
            .attr("x", 320)
            .attr("y", 80)
            .attr("fill",  "rgb(247, 163, 163)") 

        g.append('text')
            .attr('x', 350)
            .attr('y', 95)
            .text( "3DS")
            .attr('font-size', "20px")

        //Legend PS 

        g.append("rect")
            .attr("width", 20)
            .attr("height", 20)
            .attr("x", 320)
            .attr("y", 120)
            .attr("fill",  "rgb(148, 109, 100)") 

        g.append('text')
            .attr('x', 350)
            .attr('y', 135)
            .text( "PS")
            .attr('font-size', "20px")

        
        //Legend XB

        g.append("rect")
            .attr("width", 20)
            .attr("height", 20)
            .attr("x", 320)
            .attr("y", 160)
            .attr("fill",  "rgb(243, 188, 215)") 

        g.append('text')
            .attr('x', 350)
            .attr('y', 175)
            .text( "XB")
            .attr('font-size', "20px")

        //Legend PSP

        g.append("rect")
            .attr("width", 20)
            .attr("height", 20)
            .attr("x", 320)
            .attr("y", 200)
            .attr("fill",  "rgb(191, 198, 68)") 

        g.append('text')
            .attr('x', 350)
            .attr('y', 215)
            .text( "PSP")
            .attr('font-size', "20px")

        //Legend X360

        g.append("rect")
            .attr("width", 20)
            .attr("height", 20)
            .attr("x", 600)
            .attr("y", 0)
            .attr("fill",  "rgb(244, 144, 59)") 

        g.append('text')
            .attr('x', 630)
            .attr('y', 15)
            .text( "X360")
            .attr('font-size', "20px")

        //Legend NES

        g.append("rect")
            .attr("width", 20)
            .attr("height", 20)
            .attr("x", 600)
            .attr("y", 40)
            .attr("fill",  "rgb(168, 227, 149)") 

        g.append('text')
            .attr('x', 630)
            .attr('y', 55)
            .text( "NES")
            .attr('font-size', "20px")

        //Legend PS4

        g.append("rect")
            .attr("width", 20)
            .attr("height", 20)
            .attr("x", 600)
            .attr("y", 80)
            .attr("fill",  "rgb(158, 118, 195)") 

        g.append('text')
            .attr('x', 630)
            .attr('y', 95)
            .text( "PS4")
            .attr('font-size', "20px")

        //Legend N64

        g.append("rect")
            .attr("width", 20)
            .attr("height", 20)
            .attr("x", 600)
            .attr("y", 120)
            .attr("fill",  "rgb(198, 167, 160)") 

        g.append('text')
            .attr('x', 630)
            .attr('y', 135)
            .text( "N64")
            .attr('font-size', "20px")

        //Legend PC

        g.append("rect")
            .attr("width", 20)
            .attr("height", 20)
            .attr("x", 600)
            .attr("y", 160)
            .attr("fill",  "rgb(142, 142, 142)") 

        g.append('text')
            .attr('x', 630)
            .attr('y', 175)
            .text( "PC")
            .attr('font-size', "20px")

        //Legend XOne

        g.append("rect")
            .attr("width", 20)
            .attr("height", 20)
            .attr("x", 600)
            .attr("y", 200)
            .attr("fill",  'rgb(220, 224, 154)') 

        g.append('text')
            .attr('x', 630)
            .attr('y', 215)
            .text( "XOne")
            .attr('font-size', "20px")
            
}

retrieveSales()