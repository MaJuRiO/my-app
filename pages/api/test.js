import data from "../../data/raw.githubusercontent.com_kongvut_thai-province-data_master_api_province_with_amphure_tambon.json"

export default function handler(req, res) {
    res.status(200).json(

        data.data.map((province) => {
            if (province.id === 1) {
                return province.amphure.map((amphure) =>
                        amphure.tambon.map((tambon) => {
                            if (tambon.amphure_id === 1001){
                                return tambon.name_th
                            }
                        })
                );
            }
        })
    )
}
