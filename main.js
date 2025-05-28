document.addEventListener('DOMContentLoaded', function () {
    // Constants
    const PL110KV_Omega_Val_Const = 0.01;
    const T110KV_Omega_Val_Const = 0.007;
    const V110KV_Omega_Val_Const = 0.015;
    const V10KV_Omega_Val_Const = 0.02;
    const tires_Omega_Val_Const = 0.03;
    const V110KV_Tvi_Val_Const = 30;
    const PL110KV_Tvi_Val_Const = 10;
    const T110KV_Tvi_Val_Const = 100;
    const V10KV_Tvi_Val_Const = 15;
    const tires_Tvi_Val_Const = 2;
    const Planned_K_Max_Val_Const = 43;

    // Set initial values for inputs
    document.getElementById('PL110KVOmegaVal').value = PL110KV_Omega_Val_Const;
    document.getElementById('T110KVOmegaVal').value = T110KV_Omega_Val_Const;
    document.getElementById('V110KVOmegaVal').value = V110KV_Omega_Val_Const;
    document.getElementById('V10KVOmegaVal').value = V10KV_Omega_Val_Const;
    document.getElementById('tiresOmegaVal').value = tires_Omega_Val_Const;
    document.getElementById('PL110KVTviVal').value = PL110KV_Tvi_Val_Const;
    document.getElementById('T110KVTviVal').value = T110KV_Tvi_Val_Const;
    document.getElementById('V110KVTviVal').value = V110KV_Tvi_Val_Const;
    document.getElementById('V10KVTviVal').value = V10KV_Tvi_Val_Const;
    document.getElementById('tiresTviVal').value = tires_Tvi_Val_Const;
    document.getElementById('PlannedKMaxVal').value = Planned_K_Max_Val_Const;

    // Function to calculate for Task 1
    document.getElementById('button__first').addEventListener('click', function () {
        const PL110KV_Omega_Val = parseFloat(document.getElementById('PL110KVOmegaVal').value);
        const T110KV_Omega_Val = parseFloat(document.getElementById('T110KVOmegaVal').value);
        const V110KV_Omega_Val = parseFloat(document.getElementById('V110KVOmegaVal').value);
        const V10KV_Omega_Val = parseFloat(document.getElementById('V10KVOmegaVal').value);
        const tires_Omega_Val = parseFloat(document.getElementById('tiresOmegaVal').value);
        const PL110KV_Tvi_Val = parseFloat(document.getElementById('PL110KVTviVal').value);
        const T110KV_Tvi_Val = parseFloat(document.getElementById('T110KVTviVal').value);
        const V110KV_Tvi_Val = parseFloat(document.getElementById('V110KVTviVal').value);
        const V10KV_Tvi_Val = parseFloat(document.getElementById('V10KVTviVal').value);
        const tires_Tvi_Val = parseFloat(document.getElementById('tiresTviVal').value);
        const Planned_K_Max_Val = parseFloat(document.getElementById('PlannedKMaxVal').value);

        // Calculate OmegaSum
        const OmegaSumVal = PL110KV_Omega_Val * 10 + T110KV_Omega_Val + V110KV_Omega_Val + V10KV_Omega_Val + 6 * tires_Omega_Val;

        // Calculate tvosVal
        const tvosVal = (PL110KV_Tvi_Val * PL110KV_Omega_Val + T110KV_Tvi_Val * T110KV_Omega_Val + V110KV_Tvi_Val * V110KV_Omega_Val + V10KV_Tvi_Val * V10KV_Omega_Val + tires_Tvi_Val * 6 * tires_Omega_Val) / OmegaSumVal;

        // Calculate kaosVal
        const kaosVal = (OmegaSumVal * tvosVal) / 8760;

        // Calculate kposVal
        const kposVal = 1.2 * (Planned_K_Max_Val / 8760);

        // Calculate DKOmega
        const DKOmega = 2 * OmegaSumVal * (kaosVal + kposVal);

        // Calculate DSOmega
        const DSOmega = DKOmega + V10KV_Omega_Val;

        document.getElementById('OmegaSumVal').textContent = OmegaSumVal.toFixed(4);
        document.getElementById('tvosVal').textContent = tvosVal.toFixed(2);
        document.getElementById('kaosVal').textContent = (kaosVal * Math.pow(10, 4)).toFixed(2);
        document.getElementById('kposVal').textContent = (kposVal * Math.pow(10, 4)).toFixed(2);
        document.getElementById('DKOmega').textContent = (DKOmega * Math.pow(10, 4)).toFixed(2);
        document.getElementById('DSOmega').textContent = (DSOmega).toFixed(4);
    });

    // Functions for Task 2 calculations
    function calcWnedaVal(Omega, tv, Pm, Tm) {
        return Omega * tv * Pm * Tm;
    }

    function calcWnedpVal(kp, Pm, Tm) {
        return kp * Pm * Tm;
    }

    function calcZperVal(ZperA, Wneda, ZperP, Wnedp) {
        return ZperA * Wneda + ZperP * Wnedp;
    }

    // Event listener for Task 2 button
    document.getElementById('button__second').addEventListener('click', function () {
        const ZperAVal = parseFloat(document.getElementById('ZperAVal').value);
        const ZperPVal = parseFloat(document.getElementById('ZperPVal').value);
        const OmegaVal = parseFloat(document.getElementById('OmegaVal').value);
        const tvVal = parseFloat(document.getElementById('tvVal').value);
        const kpVal = parseFloat(document.getElementById('kpVal').value);
        const PmVal = parseFloat(document.getElementById('PmVal').value);
        const TmVal = parseFloat(document.getElementById('TmVal').value);

        let WnedaValResult = calcWnedaVal(OmegaVal, tvVal, PmVal, TmVal);
        let WnedpValResult = calcWnedpVal(kpVal, PmVal, TmVal);
        let ZperValResult = calcZperVal(ZperAVal, WnedaValResult, ZperPVal, WnedpValResult);

        document.getElementById('WnedaVal').textContent = WnedaValResult.toFixed(2);
        document.getElementById('WnedpVal').textContent = WnedpValResult.toFixed(2);
        document.getElementById('ZperVal').textContent = ZperValResult.toFixed(2);
    });
});