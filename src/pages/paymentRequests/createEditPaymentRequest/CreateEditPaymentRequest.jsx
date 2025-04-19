import { Box, FormGroup, TextareaAutosize, TextField } from "@mui/material";

import "./createEditPaymentRequest.css";
import "../../../assets/css/globalFormat.css";
import { Icons } from "../../../assets/Icons";
import { FormButtonGroupContainer } from "../../../components/common/formButtonGroup/FormButtonGroupContainer";
import { OptionSelect } from "../../../components/common/optionSelect/OptionSelect";
import { SizeTextButtonGroupContainer } from "../../../components/common/sizeTextButtonGroup/SizeTextButtonGroupContainer";

export const CreateEditPaymentRequest = ({
  formData,
  cudBillingRecords,
  modifiedFlag,
  isLoadingButton,
  textSize,
  setTextSize,
  paymentRequestId,
  cudBillinRecordId,
  handleChange,
  handleSubmit,
}) => {
  const formButtonGroupProps = {
    modifiedFlag,
    isLoadingButton,
  };

  const sizeTextButtonGroupContainerProps = { textSize, setTextSize };

  const textareaAutosizeStyle = {
    width: "90%",
    maxWidth: "1000px",
    height: "100px",
    fontSize: textSize,
  };

  const elementStyle = {
    margin: "10px",
    width: "200px",
    backgroundColor: "white",
  };

  const iconsStyle = { marginRight: "5px" };

  return (
    <Box className="generalContainer">
      <Box className="generalTitle">
        {paymentRequestId && "Editar reclamo"}
        {!paymentRequestId && "Crear nuevo reclamo"}
      </Box>

      <Box className="createEditPaymentRequestContainer">
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Box className="createEditPaymentRequestMenuContainer">
              <Box className="createEditPaymentRequestMenuItemContainer">
                <Icons.CalendarMonthIcon />
                <TextField
                  label="Fecha reclamo"
                  name="fechareclamo"
                  onChange={handleChange}
                  required
                  variant="outlined"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={formData.fechareclamo}
                  sx={{
                    "& .MuiInputBase-root": {
                      height: 40,
                      backgroundColor: "white",
                    },
                    width: "100%",
                  }}
                />
              </Box>
              <Box className="createEditPaymentRequestMenuItemContainer">
                <Icons.ReceiptIcon />
                <OptionSelect
                  getOptionLabel={(option) => `${option.nrofactura}`}
                  name="idfacturacioncud"
                  placeholder="Seleccionar factura"
                  clients={cudBillingRecords}
                  value={formData.idfacturacioncud}
                  onChange={handleChange}
                  label={"Factura"}
                  required
                  disabled={cudBillinRecordId ? true : false}
                />
              </Box>

              <Box className="createEditPaymentRequestMenuItemContainer">
                <Icons.ErrorIcon />
                <TextField
                  style={elementStyle}
                  aria-label="minimum height"
                  label="Medio reclamo"
                  placeholder="Medio reclamo"
                  name="medioreclamo"
                  onChange={handleChange}
                  value={formData.medioreclamo}
                  sx={{
                    "& .MuiInputBase-root": {
                      height: 40,
                      backgroundColor: "white",
                    },
                    width: "100%",
                    "& .MuiInputLabel-root": {
                      marginTop: "-5px",
                    },
                  }}
                />
              </Box>
            </Box>

            {/* Barra de botones para cambiar el tamaño del texto */}
            <SizeTextButtonGroupContainer
              {...sizeTextButtonGroupContainerProps}
            />
            <Box className="generalSmallTitle">Descripción Reclamo</Box>
            <Box className="createEditPaymentRequestTextAreaContainer">
              <TextareaAutosize
                style={textareaAutosizeStyle}
                aria-label="minimum height"
                minRows={1}
                placeholder="Escribí el texto de tu reclamo"
                name="descripcionreclamo"
                onChange={handleChange}
                value={formData.descripcionreclamo}
              />
            </Box>
            <Box className="generalSmallTitle">Respuesta Reclamo</Box>
            <Box className="createEditPaymentRequestTextAreaContainer">
              <TextareaAutosize
                style={textareaAutosizeStyle}
                aria-label="minimum height"
                minRows={1}
                placeholder="Escribí la respuesta de tu reclamo"
                name="respuestareclamo"
                onChange={handleChange}
                value={formData.respuestareclamo}
              />
            </Box>
            <Box className="createEditPaymentRequestTextAreaContainer">
              <Box sx={{ width: "90%", maxWidth: "1000px" }}>
                <FormButtonGroupContainer {...formButtonGroupProps} />
              </Box>
            </Box>
          </FormGroup>
        </form>
      </Box>
    </Box>
  );
};
