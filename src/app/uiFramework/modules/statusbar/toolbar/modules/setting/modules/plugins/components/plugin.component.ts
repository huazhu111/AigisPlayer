import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PluginService, Plugin } from '../../../../../../../../../core/plugin.service'
import { ElectronService } from '../../../../../../../../../core/electron.service';

@Component({
    selector: 'app-plugins-plugin',
    templateUrl: './plugin.component.html',
    styleUrls: ['./plugin.component.scss'],
})
export class PluginsPluginComponent implements OnInit {
    @Input() plugin: Plugin = new Plugin();
    isInstalled = false;
    needUpdate = false;
    needRestart = false;
    isInstalling = false;
    isError = false;
    constructor(private pluginService: PluginService, private electronService: ElectronService) {
    }
    ngOnInit() {
        if (this.plugin.needRestart) {
            this.needRestart = true;
        } else {
            const pluginInstalled = this.pluginService.PluginList.find((v) => {
                if (v.path === this.plugin.path) {
                    return true;
                } else { return false; }
            })
            if (pluginInstalled) {
                this.isInstalled = true;
                if(this.plugin.developmode) {
                    this.needUpdate = pluginInstalled.version === this.plugin.version ? false : true;
                } else {
                    this.isInstalling = true;
                    this.pluginService.installPluginFromRemote(this.plugin)
                                        .then(e=>this.needRestart = true)
                                        .catch(err=>{
                                            this.isInstalling = false;
                                            console.log(err)
                                        })
                }
                
            }
            this.isInstalling = this.plugin.installing;
        }
    }
    async remove() {
        if (await this.pluginService.removePlugin(this.plugin)) {
            this.needRestart = true;
        }
    }
    async install() {
        this.isInstalling = true;
        if (await this.pluginService.installPluginFromRemote(this.plugin)) {
            this.needRestart = true;
        } else {
            this.isInstalling = false;
        }
    }
    async restart() {
        this.electronService.Restart();
    }
    async update() {
        console.log('update');
        this.isInstalling = true;
        if (await this.pluginService.installPluginFromRemote(this.plugin)) {
            this.needRestart = true;
        } else {
            this.isInstalling = false;
        }
    }
}
