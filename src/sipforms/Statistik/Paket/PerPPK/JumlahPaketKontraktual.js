import React, { Component } from 'react';
import { Container } from '@extjs/ext-react';
import { Cartesian } from '@extjs/ext-react-charts';
import ChartToolbar from '../../ChartToolbar';

Ext.require([
    'Ext.chart.series.Bar',
    'Ext.chart.axis.Numeric',
    'Ext.chart.axis.Category'
]);

export default class JumlahPaketKontraktual extends Component {

    store = Ext.create('Ext.data.Store', {
        fields: ['namappk', 'jumlah'],
        data: [
            { namappk: 'Agus Raharyo', jumlah: 4 },
            { namappk: 'Andie Mai Endrijatno', jumlah: 2 },
            { namappk: 'Chandra Permana', jumlah: 3 },
            { namappk: 'Dicky Rinaldi', jumlah: 8 },
            { namappk: 'Esthy Dwjumlaha Praptaningjati', jumlah: 1 },
            { namappk: 'Encik Hardiansyah Pranata Putra', jumlah: 11},
            { namappk: 'Samuel EDP Tampubolon', jumlah: 4},
            { namappk: 'Vita Puspitasari', jumlah: 7},
            { namappk: 'Yanuar Munlait', jumlah: 8},
        ]
    });

    state = {
        theme: 'default'
    };

    changeTheme = theme => this.setState({ theme })

    onAxisLabelRender = (axis, label, layoutContext) => {
        return Ext.util.Format.number(layoutContext.renderer(label) / 1, '0,0');
    }

    onSeriesLabelRender = (v) => {
        return Ext.util.Format.number(v / 1, '0,0');
    }

    render() {
        const { theme } = this.state;

        return (
            <Container padding={!Ext.os.is.Phone && 10} layout="fit">
                <Cartesian
                    shadow
                    insetPadding="70 40 0"
                    platformConfig={{
                        phone: {
                            insetPadding: '50 0 0'
                        }
                    }}
                    flipXY
                    store={this.store}
                    theme={theme}
                    series={[{
                        type: 'bar',
                        xField: 'namappk',
                        yField: 'jumlah',
                        style: {
                            opacity: 0.80,
                            minGapWidth: 10
                        },
                        label: {
                            field: 'jumlah',
                            display: 'insideEnd',
                            renderer: this.onSeriesLabelRender
                        }
                    }]}
                    axes={[{
                        type: 'numeric',
                        position: 'bottom',
                        fields: 'jumlah',
                        grid: true,
                        maximum: 12,
                        majorTickSteps: 10,
                        title: 'Jumlah Paket',
                        renderer: this.onAxisLabelRender
                    }, {
                        type: 'category',
                        position: 'left',
                        fields: 'namappk',
                        grid: true
                    }]}
                    captions={{
                        title: {
                            text: 'Jumlah Paket Kegiatan Kontraktual per PPK',
                        }
                    }}
                />
            </Container>            
        )
    }
}