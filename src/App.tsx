import { useState } from "react";
import {
  Box,
  Flex,
  FormControl,
  Input,
  InputAddon,
  InputGroup,
  Text,
  Button,
} from "@chakra-ui/react";
import { FaLock, FaMailBulk } from "react-icons/fa";

function App() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    console.log("Dados enviados:", formData);

    const queryString = new URLSearchParams(formData).toString();
    const response = await fetch(`http://localhost:3000/log-in?${queryString}`, {
      method: "GET",
    });

    if(!response.ok){

    }
    console.log(await response.json())
    // Aqui você pode manipular os dados, como enviá-los para um backend
  };

  return (
    <Flex justifyContent={"center"}>
      <Flex
        maxWidth={"80%"}
        justifyContent={"center"}
        alignItems={"center"}
        height={"100dvh"}
        width={"500px"}
      >
        <FormControl
          sx={{
            textAlign: "center",
            border: "1px solid black",
            height: "300px",
            padding: "20px",
            maxW: "400px",
          }}
        >
          <Text
            sx={{
              fontSize: "x-large",
              fontWeight: "600",
            }}
          >
            Log-in
          </Text>
          <Flex
            sx={{
              gap: "10px",
            }}
            height={"fit-content"}
            flexDir={"column"}
          >
            <InputGroup>
              <InputAddon>
                <FaMailBulk />
              </InputAddon>
              <Input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
              />
            </InputGroup>
            <InputGroup>
              <InputAddon>
                <FaLock />
              </InputAddon>
              <Input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Senha"
              />
            </InputGroup>
            <Button
              sx={{
                width: "100%",
                padding: "20px",
                fontSize: "x-large",
              }}
              colorScheme="blue"
              onClick={async ()=>{
                await handleSubmit();
              }}
            >
              Log-in
            </Button>
          </Flex>
        </FormControl>
      </Flex>
    </Flex>
  );
}

export default App;
