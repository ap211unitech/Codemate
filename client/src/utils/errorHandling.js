const jDoodleError = (outputJson) => {
    let output = outputJson.output;

    output = output.replace("Contact JDoodle support at jdoodle@nutpan.com for more information.", "");
    output = output.replace(/jdoodle./g, "main.");
    output = output.replace(/JDoodle/g, "Error");
    return output

}

export default jDoodleError