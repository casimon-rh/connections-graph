import * as React from 'react'

import { Graph } from '@vx/network'
import { Group } from '@vx/group'
import { scalePower } from '@vx/scale'
import { LinearGradient } from '@vx/gradient'
import { nodes, links } from './Nodes'

import { getName } from './Dictionary'

export default class extends React.Component {
  blue = '#fff';
  bg = '#000';

  extent = (data: any[], value = (d: any) => d) => [
    Math.min(...data.map(value)),
    Math.max(...data.map(value))
  ];

  yScale = scalePower<number>({
    domain: this.extent([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
  });

  constructor (props: any) {
    super(props)
    this.state = { width: 0, height: 0, graph: { nodes: [], links: [] } }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
  }

  componentDidMount () {
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  updateWindowDimensions () {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
      graph: {
        nodes,
        links
      }
    })
  }

  render () {
    const state: any = this.state
    const height = state.height; const width = state.width
    const graph = state.graph
    // update range based on height with some offset
    this.yScale.range([0, height / 2 - 20])

    return (
      <svg width={width} height={height}>
        <LinearGradient from={this.bg} to={this.blue} id='line-gradient' />
        <rect width={width} height={height} fill={this.bg} />
        <Graph graph={graph} />
        <Group top={height / 2} left={width / 2}>
          {this.yScale.ticks().map((tick, i) => {
            const y = this.yScale(tick)
            const opacity = 1 / (i + 1) - 1 / i * 0.2
            return (
              <g key={`radial-grid-${i}`}>
                <text
                  y={y}
                  dy='.33em'
                  fontSize={30}
                  fill='#fff'
                  textAnchor='middle'
                >
                  {getName(tick)}
                </text>
                <circle
                  r={y}
                  stroke={this.blue}
                  strokeWidth={1}
                  fill={this.blue}
                  fillOpacity={opacity}
                  strokeOpacity={0.2}
                />
              </g>
            )
          })}
        </Group>
      </svg>
    )
  }
};
