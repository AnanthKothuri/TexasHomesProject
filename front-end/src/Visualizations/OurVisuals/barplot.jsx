import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const BarPlot = () => {
    const ref = useRef();

    useEffect(() => {
        fetch("http://api.texashomesproject.me/shelters/")
            .then(response => response.json())
            .then(data => {
                if (data) {
                    drawBarPlot(processData(data));
                }
            })
            .catch(error => console.error('Error fetching data: ', error));
    }, []);

    const processData = (shelters) => {
        const countByCity = {};
        shelters.forEach(shelter => {
            const city = shelter.city;
            if (city in countByCity) {
                countByCity[city]++;
            } else {
                countByCity[city] = 1;
            }
        });
        return Object.keys(countByCity).map(key => ({
            label: key,
            value: countByCity[key]
        }));
    };

    const drawBarPlot = (data) => {
        const svg = d3.select(ref.current);
        svg.selectAll("*").remove(); // Clear svg content before adding new elements

        const margin = { top: 20, right: 30, bottom: 40, left: 90 };
        const width = 460 - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;

        const x = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.value)])
            .range([0, width]);

        const y = d3.scaleBand()
            .domain(data.map(d => d.label))
            .padding(0.1)
            .range([0, height]);

        const graph = svg.append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        graph.append("g")
            .call(d3.axisLeft(y));

        graph.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x));

        graph.selectAll(".bar")
            .data(data)
            .enter()
            .append("rect")
            .classed("bar", true)
            .attr("x", 0)
            .attr("y", d => y(d.label))
            .attr("width", d => x(d.value))
            .attr("height", y.bandwidth())
            .attr("fill", "#69b3a2");
    };

    return (
        <svg ref={ref} width={500} height={450} />
    );
};

export default BarPlot;
