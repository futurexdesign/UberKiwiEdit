<script setup>
import { ref, onMounted } from 'vue'
const form$ = ref(null)

function readSingleFile(e) {

  var file = e;
  if (!file) {
    return;
  }

  var reader = new FileReader();
  reader.onload = function (ev) {
    var contents = ev.target.result;

    const data = JSON.parse(contents);
    console.info(data);
    console.info(data.settings.lift["spin-location"])
    form$.value.update({
      
      spin_location: data.settings.lift["spin-location"],
      wash_location: data.settings.lift["wash-location"],
      dry_location: data.settings.lift["dry-location"],
      rotate_location: data.settings.lift["rotate-location"],
    })
  };

  reader.readAsText(file);
}

</script>

<template>
  <div>
    <h1 class="text-3xl font-bold underline">Uber Editor</h1>
  </div>
  <div class="h-screen flex justify-center items-center">
    <Vueform ref="form$">
      <template #empty>
        <FormSteps>
          <FormStep name="upload" :elements="['file']">
            Load
          </FormStep>
          <FormStep name="lift" :elements="['lift_settings']">Lift Settings</FormStep>
        </FormSteps>
        <FormElements>
          <FileElement name="file" label="Load Settings File" :upload-temp-endpoint="false"
            :remove-temp-endpoint="false" :remove-endpoint="false" :clickable="false" :soft-remove="true"
            accept="application/json" description="Load your current settings file from disk. " :rules="[
              'required',
            ]" field-name="settings-file" @change="readSingleFile" />
          <GroupElement name="lift_settings" label="Lift Settings">
            <GroupElement name="container" label="Lift Positioning">
              <TextElement name="spin_location" input-type="number" :rules="[
                'required',
                'numeric',
              ]" autocomplete="off" label="Spin Location" description="Position in degrees for Spin "
                placeholder="12600" field-name="spin_location" />
              <TextElement name="wash_location" input-type="number" :rules="[
                'required',
                'numeric',
              ]" autocomplete="off" label="Wash Location" description="Position in degrees for Wash "
                placeholder="12600" field-name="wash_location" />
              <TextElement name="dry_location" input-type="number" :rules="[
                'required',
                'numeric',
              ]" autocomplete="off" label="Dry Location" description="Position in degrees for Dry " placeholder="8100"
                field-name="dry-location" />
              <TextElement name="rotate_location" input-type="number" :rules="[
                'required',
                'numeric',
              ]" autocomplete="off" label="Rotate Location" description="Position in degrees for Rotation "
                placeholder="3240" field-name="rotate_location" />
            </GroupElement>
            <GroupElement name="container_1" label="Motor Setup">
              <ToggleElement name="toggle" text="Show Advanced Settings" field-name="motor-adv" />
              <TextElement name="number_4" input-type="number" :rules="[
                'nullable',
                'numeric',
              ]" autocomplete="off" :conditions="[
                [
                  'lift_settings.container_1.toggle',
                  '==',
                  true,
                ],
              ]" label="Lift Speed" description="Speed in RPM" placeholder="200" field-name="lift_speed" />
              <TextElement name="number_8" input-type="number" :rules="[
                'min:400',
                'max:2000',
                'numeric',
              ]" autocomplete="off" :conditions="[
                [
                  'lift_settings.container_1.toggle',
                  '==',
                  true,
                ],
              ]" label="Lift Acceleration" description="Acceleration Factor for Lift Motor" placeholder="500"
                field-name="lift_accel" />
              <TextElement name="number_5" input-type="number" :rules="[
                'min:10',
                'max:31',
                'numeric',
              ]" autocomplete="off" :conditions="[
                [
                  'lift_settings.container_1.toggle',
                  '==',
                  true,
                ],
              ]" label="Lift iRun" description="Run Current for Lift Motor" placeholder="16" field-name="lift_irun" />
              <TextElement name="number_6" input-type="number" :rules="[
                'min:10',
                'max:31',
                'numeric',
              ]" autocomplete="off" :conditions="[
                [
                  'lift_settings.container_1.toggle',
                  '==',
                  true,
                ],
              ]" label="Lift iHold" description="Hold Current for Lift Motor" placeholder="15"
                field-name="lift_ihold" />
              <TextElement name="number_7" input-type="number" :rules="[
                'min:100',
                'max:800',
                'numeric',
              ]" autocomplete="off" :conditions="[
                [
                  'lift_settings.container_1.toggle',
                  '==',
                  true,
                ],
              ]" label="Lift Global Scaler" description="Global Scaler for Lift Motor" placeholder="400"
                field-name="lift_gs" />
              <TextElement name="number_9" input-type="number" :rules="[
                'min:-30',
                'max:30',
                'numeric',
              ]" autocomplete="off" :conditions="[
                [
                  'lift_settings.container_1.toggle',
                  '==',
                  true,
                ],
              ]" label="Lift Stall Guard Threshold" field-name="lift_sg"
                description="Stall Guard Threshold for Lift Motor" placeholder="3" />
            </GroupElement>
          </GroupElement>
          <ButtonElement name="submit" button-label="Submit" :submits="true" />
        </FormElements>
        <FormStepsControls />
      </template>
    </Vueform>
  </div>
</template>
