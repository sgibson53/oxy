import { NgModule } from '@angular/core';
import { WellModalComponent } from './well-modal/well-modal';
import { AddWellModalComponent } from './add-well-modal/add-well-modal';
import { WellService } from '../providers/well-service/well.service';

@NgModule({
	declarations: [WellModalComponent,AddWellModalComponent],
	imports: [],
	exports: [WellModalComponent,AddWellModalComponent],
	providers: [WellService]
})
export class ComponentsModule {}
