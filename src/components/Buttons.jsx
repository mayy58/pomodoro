import { useState, useEffect } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Audio } from "expo-av";

export default function Buttons({ setTime, time, currentTime }) {
  const [isActive, setIsActive] = useState(false);
  const optionsTimes = { 0: 25, 1: 5, 2: 15 };

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setTime(time - 1);
      }, 10);
    } else {
      clearInterval(interval);
    }
    if (time === 0) {
      setIsActive(false);
      setTime(optionsTimes[currentTime] * 60);
    }

    return () => clearInterval(interval);
  }, [isActive, time]);

  function handleStartStop() {
    playSound();
    setIsActive(!isActive);
  }

  function handleReset() {
    playSoundReset();
    setTime(0);
  }
  async function handleSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/pick-92276.mp3")
    );
    await sound.playAsync();
  }
  async function playSoundReset() {
    const { soundReset } = await Audio.Sound.createAsync(
      require("../../assets/mouse-click-117076.mp3")
    );
    await soundReset.playAsync();
  }

  return (
    <View>
      <TouchableOpacity onPress={handleStartStop} style={styles.button}>
        <Text style={styles.text}>{isActive ? "STOP" : "START"}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleReset} style={styles.button}>
        <Text style={styles.text}>RESET</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#333333",
    padding: 15,
    marginTop: 15,
    borderRadius: 15,
  },
  text: {
    color: "white",
    fontWeight: "bold",
  },
});
