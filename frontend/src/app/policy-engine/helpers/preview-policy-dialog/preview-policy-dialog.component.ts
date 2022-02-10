import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PolicyEngineService } from 'src/app/services/policy-engine.service';

/**
 * Dialog for export/import policy.
 */
@Component({
    selector: 'preview-policy-dialog',
    templateUrl: './preview-policy-dialog.component.html',
    styleUrls: ['./preview-policy-dialog.component.css']
})
export class PreviewPolicyDialog {
    loading = true;
    policyId!: any;
    policy!: any;
    schemes!: string;
    tokens!: string;
    policyRoles!: string;

    constructor(
        public dialogRef: MatDialogRef<PreviewPolicyDialog>,
        private policyEngineService: PolicyEngineService,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.policyId = data.policyId;

        if(data.policy) {
            this.policy = data.policy.policy;
            this.policyRoles = (this.policy.policyRoles||[]).join(', ');
            this.schemes = data.policy.schemas.map((s:any)=>`${s.name} (${s.version})`).join(', ');
            this.tokens = data.policy.tokens.map((s:any)=>s.tokenName).join(', ');
        }
    }

    ngOnInit() {
        this.loading = false;
    }

    setData(data: any) {
    }

    onClose(): void {
        this.dialogRef.close(false);
    }

    onImport() {
        this.dialogRef.close(true);
    }
}