import React, { Component } from 'react';
import { Label, Spacer, Button, Toolbar, SegmentedButton, Menu, MenuItem } from '@extjs/ext-react';

Ext.require([
    'Ext.chart.theme.Blue',
    'Ext.chart.theme.Green',
    'Ext.chart.theme.Muted',
    'Ext.chart.theme.Red',
    'Ext.chart.theme.Sky',
    'Ext.chart.theme.Yellow'
]);

const toolbarItemDefaults = {
    margin: '0 10px 0 0'
}

const downloadChart = (chart) => {
    if(Ext.is.Desktop) {
        chart.download({ filename: 'Chart' });
    } else {
        chart.preview();
    }
}
    
export default function ChartToolbar({ 
    theme, 
    onlyMidnight=false,
    onThemeChange, 
    onToggleZoomOnPan, 
    onToggleCrosshair,
    onRefreshClick,
    downloadChartRef,
    onStackGroup
}) {
    return (
        <Toolbar docked="top" ui="app-transparent-toolbar" shadow={false} margin={!Ext.os.is.Phone && "0 10"}>
            { theme && (
                <Button {...toolbarItemDefaults} iconCls="x-fa fa-picture-o" text="Theme" ui="action">
                    <Menu>
                        <MenuItem text="Default" handler={() => onThemeChange('default')} iconCls={theme === 'default' && 'x-font-icon md-icon-done'}/>
                        {!onlyMidnight && <MenuItem text="Green" handler={() => onThemeChange('green')} iconCls={theme === 'green' && 'x-font-icon md-icon-done'}/>}
                        <MenuItem text="Midnight" handler={() => onThemeChange('midnight')} iconCls={theme === 'midnight' && 'x-font-icon md-icon-done'}/>
                        {!onlyMidnight &&<MenuItem text="Muted" handler={() => onThemeChange('muted')} iconCls={theme === 'muted' && 'x-font-icon md-icon-done'}/>}
                        {!onlyMidnight && <MenuItem text="Red" handler={() => onThemeChange('red')} iconCls={theme === 'red' && 'x-font-icon md-icon-done'}/>}
                        {!onlyMidnight && <MenuItem text="Sky" handler={() => onThemeChange('sky')} iconCls={theme === 'sky' && 'x-font-icon md-icon-done'}/>}
                        {!onlyMidnight &&<MenuItem text="Yellow" handler={() => onThemeChange('yellow')} iconCls={theme === 'yellow' && 'x-font-icon md-icon-done'}/>}
                    </Menu>
                </Button>
            )}
            { downloadChartRef && (
                <Button 
                    {...toolbarItemDefaults}
                    ui="action"
                    iconCls="x-fa fa-eye" 
                    text="Preview" 
                    handler={downloadChart.bind(null, downloadChartRef)}
                    platformConfig={{
                        desktop: {
                            text: 'DOWNLOAD',
                            iconCls: 'x-fa fa-download'
                        }
                    }}
                />
            )}
            { onRefreshClick && (
                <Button ui="action" {...toolbarItemDefaults} iconCls="x-fa fa-refresh" handler={onRefreshClick} text="REFRESH"/>
            )}
            <Spacer/>
            { onStackGroup && (
                <SegmentedButton {...toolbarItemDefaults} onToggle={onStackGroup}>
                    <Button iconCls="x-fa fa-bars" text="STACK" pressed/>
                    <Button iconCls="x-fa fa-bar-chart" text="GROUP"/>
                </SegmentedButton>
            )}
            { onToggleZoomOnPan && !Ext.supports.Touch && (
                <SegmentedButton>
                    <Button iconCls="x-fa fa-arrows" handler={() => onToggleZoomOnPan(false)} pressed text="PAN"/>
                    <Button iconCls="x-fa fa-search-plus" handler={() => onToggleZoomOnPan(true)} text="ZOOM"/>
                    { onToggleCrosshair && <Button iconCls="x-fa fa-crosshairs" handler={() => onToggleCrosshair(true)} text="CROSSHAIR"/> }
                </SegmentedButton>
            )}
        </Toolbar>
    )
}
