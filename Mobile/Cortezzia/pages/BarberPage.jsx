import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Linking } from 'react-native';

export default function BarbershopDetalhes({ route }) {
  const { barbershop } = route.params;

  return (
    <ScrollView style={styles.container}>
      {/* Imagem de destaque */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: barbershop.imagem }} style={styles.image} />
      </View>

      {/* Nome e Descrição da Barbearia */}
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{barbershop.nome}</Text>
        <Text style={styles.description}>{barbershop.descricao}</Text>
      </View>

      {/* Seção de Contato */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contato</Text>
        <Text style={styles.info}>{barbershop.telefone}</Text>
        <Text style={styles.info}>{barbershop.email}</Text>
      </View>

      {/* Seção de Endereço */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Endereço</Text>
        <Text style={styles.info}>
          {barbershop.endereco.rua}, {barbershop.endereco.numero} - {barbershop.endereco.bairro}
        </Text>
        <Text style={styles.info}>
          {barbershop.endereco.cidade} - {barbershop.endereco.estado}, {barbershop.endereco.cep}
        </Text>
      </View>

      {/* Seção de Horários */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Horários</Text>
        {Object.entries(barbershop.horarios).map(([dia, horario]) => (
          <Text key={dia} style={styles.info}>
            {dia.charAt(0).toUpperCase() + dia.slice(1)}: {horario.abertura === "Fechado" ? "Fechado" : `${horario.abertura} - ${horario.fechamento || "?"}`}
          </Text>
        ))}
      </View>

      {/* Seção de Redes Sociais */}
      <View style={styles.socialMediaContainer}>
        <TouchableOpacity onPress={() => Linking.openURL(barbershop.social_media.facebook)}>
          <Ionicons name="logo-facebook" size={30} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL(barbershop.social_media.instagram)}>
          <Ionicons name="logo-instagram" size={30} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Seção de Serviços */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Serviços</Text>
        {console.log(barbershop.servicos)}
        {barbershop.servicos && barbershop.servicos.length > 0 ? (
          barbershop.servicos.map((servico, index) => (
            <View key={index} style={styles.serviceCard}>
              <Text style={styles.serviceName}>{servico.nome || "Serviço desconhecido"}</Text>
              <Text style={styles.serviceDescription}>{servico.descricao || "Descrição não disponível"}</Text>
              <Text style={styles.info}>R$ {servico.preco ? servico.preco.toFixed(2) : "?"}</Text>
              <Text style={styles.info}>{servico.duracao_minutos ? `${servico.duracao_minutos} min` : "Duração não informada"}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.info}>Nenhum serviço disponível</Text>
        )}
      </View>

      {/* Botão de Agendar */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Agendar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 16,
  },
  imageContainer: {
    width: '100%',
    height: 250,
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  infoContainer: {
    marginBottom: 20,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    color: '#666',
    fontSize: 14,
    marginTop: 4,
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  info: {
    color: '#444',
    fontSize: 14,
  },
  socialMediaContainer: {
    flexDirection: 'row',
    marginTop: 16,
    justifyContent: 'space-around',
  },
  serviceCard: {
    marginTop: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 12,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  serviceDescription: {
    color: '#555',
    fontSize: 13,
  },
  button: {
    backgroundColor: '#000',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
