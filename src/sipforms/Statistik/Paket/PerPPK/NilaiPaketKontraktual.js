import React, { Component } from 'react';
import { Container } from '@extjs/ext-react';
import { Cartesian } from '@extjs/ext-react-charts';
import ChartToolbar from '../../ChartToolbar';

Ext.require([
    'Ext.chart.series.Bar',
    'Ext.chart.axis.Numeric',
    'Ext.chart.axis.Category'
]);

export default class NilaiPaketKontraktual extends Component {

    store = Ext.create('Ext.data.Store', {
        fields: ['namappk', 'jumlah'],
        data: [
            { namappk: 'Agus Raharyo', jumlah: 3244606000 },
            { namappk: 'Andie Mai Endrijatno', jumlah: 1731246000 },
            { namappk: 'Chandra Permana', jumlah: 705179970 },
            { namappk: 'Dicky Rinaldi', jumlah: 10034000000 },
            { namappk: 'Encik Hardiansyah Pranata Putra', jumlah: 9798628000 },
            { namappk: 'Esthy Dwjumlaha Praptaningjati', jumlah: 327374000 },          
            { namappk: 'Samuel EDP Tampubolon', jumlah: 3353428000},
            { namappk: 'Vita Puspitasari', jumlah: 7210272000},
            { namappk: 'Yanuar Munlait', jumlah: 12090817000},
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
                        maximum: 12500000000,
                        majorTickSteps: 10,
                        title: 'Nilai Paket',
                        renderer: this.onAxisLabelRender
                    }, {
                        type: 'category',
                        position: 'left',
                        fields: 'namappk',
                        grid: true
                    }]}
                    captions={{
                        title: {
                            text: 'Nilai Paket Kegiatan Kontraktual per PPK',
                        }
                    }}
                />
            </Container>            
        )
    }
}