import React, { Component } from 'react';
import { Container } from '@extjs/ext-react';
import { Cartesian } from '@extjs/ext-react-charts';
import ChartToolbar from '../../ChartToolbar';

Ext.require([
    'Ext.chart.series.Bar',
    'Ext.chart.axis.Numeric',
    'Ext.chart.axis.Category'
]);

export default class JumlahPaketSwakelola extends Component {

    store = Ext.create('Ext.data.Store', {
        fields: ['namappk', 'jumlah'],
        data: [
            { namappk: 'Agus Raharyo', jumlah: 15455815000 },
            { namappk: 'Andie Mai Endrijatno', jumlah: 14928922000 },
            { namappk: 'Chandra Permana', jumlah: 9146378600 },
            { namappk: 'Dicky Rinaldi', jumlah: 8435401000 },
            { namappk: 'Esthy Dwinda Praptaningjati', jumlah: 9118345000 },
            { namappk: 'Eddy Irwanto', jumlah: 8782997000},
            { namappk: 'Eko Kusumo Friatmojo', jumlah: 10711914000},
            { namappk: 'Encik Hardiansyah Pranata Putra', jumlah: 22136800000},
            { namappk: 'Faisal Rizal', jumlah: 5686828000},
            { namappk: 'Muzaqi', jumlah: 3091874000},
            { namappk: 'Nova Fatkhur Rahman', jumlah: 6142391000},
            { namappk: 'Riky Aditya Nazir', jumlah: 10076006000},
            { namappk: 'Samuel EDP Tampubolon', jumlah: 17758589000},
            { namappk: 'Vita Puspitasari', jumlah: 9419789000},
            { namappk: 'Wagino',   jumlah: 7474818000},
            { namappk: 'Yanuar Munlait', jumlah: 8084593000},
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
                        maximum: 22500000000,
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
                            text: 'Nilai Paket Kegiatan Swakelola per PPK',
                        }
                    }}
                />
            </Container>            
        )
    }
}