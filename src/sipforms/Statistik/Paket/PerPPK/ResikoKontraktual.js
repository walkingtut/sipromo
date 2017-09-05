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

export default class ResikoKontraktual extends Component {

 store = Ext.create('Ext.data.Store', {
    fields: ['namappk', 'total', 'resiko'],
    data: [
        { namappk: 'Agus Raharyo', total: 4, resiko: 2 },
        { namappk: 'Andie Mai Endrijatno', total: 2, resiko: 1 },
        { namappk: 'Chandra Permana', total: 3, resiko: 1 },
        { namappk: 'Dicky Rinaldi', total: 8, resiko: 2 },
        { namappk: 'Esthy Dwjumlaha Praptaningjati', total: 1, resiko: 0 },
        { namappk: 'Encik Hardiansyah Pranata Putra', total: 11, resiko: 2},
        { namappk: 'Samuel EDP Tampubolon', total: 4, resiko: 1},
        { namappk: 'Vita Puspitasari', total: 7, resiko: 1},
        { namappk: 'Yanuar Munlait', total: 8, resiko: 2},
    ]
});
 
    state = {
        theme: 'sky'
    };

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
                            text: 'Jumlah Total Paket Kegiatan Kontraktual dan Paket Beresiko per PPK',
                        }
                    }}
                />
            </Container>
        )
    }
}