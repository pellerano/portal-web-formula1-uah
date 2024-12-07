class ConstantsUtil {
    getPaises() {
        return [
            { value: "España", text:"España"},
            { value: "Italia", text:"Italia"},
            { value: "Francia", text:"Francia"},
            { value: "Argentina", text:"Argentina"},
            { value: "Ecuador", text:"Ecuador"},
            { value: "Paises Bajos", text:"Paises Bajos"},
            { value: "Alemania", text:"Alemania"},
            { value: "Monaco", text:"Monaco"},
            { value: "Inglaterra", text:"Inglaterra"},
        ]
    }
}

const ConstantsUtilInstance = new ConstantsUtil()
Object.freeze(ConstantsUtilInstance)

export default ConstantsUtilInstance