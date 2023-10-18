/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Button from '../Core/Button';
import { Colors } from '../../constants';
import { TrashIcon } from '../Core/Icons';

type EmployeeSkillsProps = {
  saveEmployeePressed: boolean;
  userFormOutput: (form: any) => void;
  employeeSkills?: any;
};

const EmployeeSkills = ({
  userFormOutput,
  employeeSkills,
  saveEmployeePressed = false,
}: EmployeeSkillsProps) => {
  //Skills input fields
  const [skillValue, setSkillValue] = useState('');
  const [experienceValue, setExperienceValue] = useState('');
  const [seniorityRating, setSeniorityRating] = useState('');

  const [numberOfSkills, setNumberOfSkills] = useState(1);

  const skillInputRefs = useRef<string[]>([skillValue]);
  const experienceRef = useRef<string[]>([experienceValue]);
  const seniorityRef = useRef<string[]>([seniorityRating]);

  const skillsInputs: JSX.Element[] = [];

  useEffect(() => {
    saveEmployeePressed && getEmployeeSkills();
  }, [saveEmployeePressed]);

  useEffect(() => {
    if (employeeSkills) {
      setNumberOfSkills(employeeSkills?.length);

      for (let index = 0; index < employeeSkills.length; index++) {
        const skillInputs = skillInputRefs.current;
        skillInputs[index] = employeeSkills[index].skill;
        setSkillValue(employeeSkills[index].skill);

        const yearsExperienceInputs = experienceRef.current;
        yearsExperienceInputs[index] = employeeSkills[index].yearsExperience;
        setExperienceValue(employeeSkills[index].yearsExperience);

        const seniorityInput = seniorityRef.current;
        seniorityInput[index] = employeeSkills[index].seniority;
        setSeniorityRating(employeeSkills[index].seniority);
      }
    }
  }, [employeeSkills]);

  const getEmployeeSkills = () => {
    let skillsArray: any = [];
    for (let index = 0; index < numberOfSkills; index++) {
      skillsArray.push({
        skill: skillInputRefs?.current[index],
        yearsExperience: experienceRef?.current[index],
        seniority: seniorityRef?.current[index],
      });
    }
    if (skillsArray?.length > 0) {
      userFormOutput(skillsArray);
    }
  };

  const addSkill = () => {
    skillInputRefs.current.push('');
    setNumberOfSkills(value => value + 1);
  };

  const removeSkill = (index: number) => {
    skillInputRefs.current.splice(index, 1)[0];
    setNumberOfSkills(value => value - 1);
  };

  for (let i = 0; i < numberOfSkills; i++) {
    skillsInputs.push(
      <View key={i} style={styles.inputContainer}>
        <View style={styles.rowContainer}>
          <View style={styles.columnContainer}>
            <Text style={styles.inputLabel}>Skill</Text>
            <TextInput
              style={styles.input}
              onChangeText={(value: any) => setSkill(i, value)}
              value={skillInputRefs.current[i]}
              returnKeyType={'done'}
              textAlignVertical={'top'}
            />
          </View>
          <View style={styles.yearsColumnContainer}>
            <Text style={styles.inputLabel}>Yrs Exp</Text>
            <TextInput
              style={styles.input}
              onChangeText={(value: any) => setYearsExperience(i, value)}
              value={experienceRef.current[i]}
              returnKeyType={'done'}
              textAlignVertical={'top'}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.columnContainer}>
            <Text style={styles.inputLabel}>Seniority</Text>
            <TextInput
              style={styles.input}
              onChangeText={(value: any) => setSeniority(i, value)}
              value={seniorityRef.current[i]}
              returnKeyType={'done'}
              textAlignVertical={'top'}
            />
          </View>
          <TouchableOpacity
            style={styles.deleteContainer}
            onPress={() => removeSkill(i)}>
            <TrashIcon />
          </TouchableOpacity>
        </View>
      </View>,
    );
  }

  const setSkill = (index: number, value: string) => {
    const skillInputs = skillInputRefs.current;
    skillInputs[index] = value;
    setSkillValue(value);
  };

  const setYearsExperience = (index: number, value: string) => {
    const yearsExperienceInputs = experienceRef.current;
    yearsExperienceInputs[index] = value;
    setExperienceValue(value);
  };

  const setSeniority = (index: number, value: string) => {
    const seniorityInput = seniorityRef.current;
    seniorityInput[index] = value;
    setSeniorityRating(value);
  };

  return (
    <View style={styles.container}>
      <View style={styles.borderBottomFullScreen} />
      <Text style={[styles.sectionLabel, styles.margin]}>Skills</Text>

      {skillsInputs}

      <View style={styles.buttonContainer}>
        <Button text={'Add skill'} disabled={false} pressedOutput={addSkill} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    height: 50,
    borderRadius: 10,
    borderColor: Colors.default.primary,
    borderWidth: 1,
    padding: 10,
    width: '100%',
    color: Colors.default.primary,
    backgroundColor: Colors.default.white,
  },
  inputContainer: {
    marginTop: 0,
  },
  inputLabel: {
    color: Colors.default.secondary,
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 20,
  },
  sectionLabel: {
    color: Colors.default.primary,
    fontSize: 14,
    marginBottom: 10,
    fontWeight: '600',
  },
  margin: {
    marginTop: 20,
  },
  rowContainer: {
    flexDirection: 'row',
  },
  columnContainer: {
    flexDirection: 'column',
    width: '35%',
    marginRight: 5,
  },
  deleteContainer: {
    width: '5%',
    marginTop: 55,
  },
  yearsColumnContainer: {
    flexDirection: 'column',
    width: '20%',
    marginRight: 5,
  },
  borderBottomFullScreen: {
    borderBottomColor: Colors.default.primary,
    borderBottomWidth: 1,
    marginTop: 25,
  },
  buttonContainer: {
    marginVertical: 20,
    width: '50%',
    alignSelf: 'center',
  },
  saveButtonContainer: {
    height: 48,
    backgroundColor: Colors.default.tertiary,
    alignItems: 'center',
    alignContent: 'center',
    borderRadius: 4,
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    fontSize: 18,
    color: Colors.default.white,
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default EmployeeSkills;
