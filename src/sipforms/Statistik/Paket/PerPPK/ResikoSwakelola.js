import React, { Component } from 'react';
import { Container } from '@extjs/ext-react';
import { Cartesian } from '@extjs/ext-react-charts';
import ChartToolbar from '../../ChartToolbar';

Ext.require([
    'Ext.chart.interactions.PanZoom',
    'Ext.chart.series.Bar',
    'Ext.chart.axis.Numeric',
    'Ext.chart.axis.Category'
]);

export default class StackedBarChartExample extends Component {

 store = Ext.create('Ext.data.Store', {
    fields: ['namappk', 'total', 'resiko'],
    data: [
        { namappk: 'Agus Raharyo', total: 19, resiko: 2 },
        { namappk: 'Andie Mai Endrijatno', total: 19, resiko: 4 },
        { namappk: 'Chandra Permana', total: 38, resiko: 5 },
        { namappk: 'Dicky Rinaldi', total: 10, resiko: 1 },
        { namappk: 'Esthy Dwtotala Praptaningjati', total: 34, resiko: 2 },
        { namappk: 'Eddy Irwanto', total: 14, resiko: 3 },
        { namappk: 'Eko Kusumo Friatmojo', total: 20, resiko: 4 },
        { namappk: 'Encik Hardiansyah Pranata Putra', total: 28, resiko: 2 },
        { namappk: 'Faisal Rizal', total: 24, resiko: 1 },
        { namappk: 'Muzaqi', total: 30, resiko: 5 },
        { namappk: 'Nova Fatkhur Rahman', total: 6, resiko: 0},
        { namappk: 'Riky Aditya Nazir', total: 15, resiko: 3},
        { namappk: 'Samuel EDP Tampubolon', total: 15, resiko: 4},
        { namappk: 'Vita Puspitasari', total: 17, resiko: 3},
        { namappk: 'Wagino',   total: 32, resiko: 3},
        { namappk: 'Yanuar Munlait', total: 11, resiko: 2},
    ]
});
 
    state = {
        theme: 'sky'
    };

//    refresh = () => {
//        this.store.loadData();
//    }

    onAxisLabelRender = (axis, label, layoutContext) => {
        return Ext.util.Format.number(layoutContext.renderer(label) / 1, '0,0');
    }

    onSeriesLabelRender = (v) => {
        return Ext.util.Format.number(v / 1, '0,0');
}

    changeTheme = theme => this.setState({ theme })

    render() {
        const { theme } = this.state;
        
        return (
            <Container padding={!Ext.os.is.Phone && 10} layout="fit">
                <Cartesian
                    shadow
                    flipXY={true}
                    store={this.store}
                    theme={theme}
                    insetPadding={'20 20 10 10'}
                    series={[{
                        type: 'bar',
                        xField: 'namappk',
                        yField: ['resiko', 'total'],
                        label: {
                            field: ['resiko','total'],
                            display: 'insideEnd',
                            renderer: this.onSeriesLabelRender
                        }
                    }]}
                    axes={[{
                        type: 'numeric',
                        position: 'bottom',
                        fields: ['resiko', 'total'],
                        grid: {
                            even: {
                                lineWidth: 1
                            },
                            odd: {
                                stroke: '#fff'
                            }
                        },
                        label: {
                            rotate: {
                                degrees: -90
                            }
                        },
                        maxZoom: 1
                    }, {
                        type: 'category',
                        position: 'left',
                        fields: 'namappk',
                        maxZoom: 4
                    }]}
                    captions={{
                        title: {
                            text: 'Jumlah Total Paket Kegiatan Swakelola dan Paket Beresiko per PPK',
                        }
                    }}
                />
            </Container>
        )
    }
}