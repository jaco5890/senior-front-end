/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { View } from 'react-native';
import { Card, Modal, StyleService, Text } from '@ui-kitten/components';
import PopupProps from '../../interfaces/popupInterface';
import { Colors } from '../../constants';
import OutlineButton from './OutlineButton';
import Button from './Button';

export const ModalPopup = (props: PopupProps) => {
  const { title = '', message = '', popupOutput } = props;

  const backdropPress = () => {
    //prevent from pressing outside popup and closing it
  };

  const handleUserDeletion = (output: boolean) => {
    popupOutput({ deleteAccount: output });
  };

  return (
    <View style={styles.container}>
      <Modal
        visible
        style={styles.container}
        backdropStyle={styles.backdrop}
        onBackdropPress={backdropPress}>
        <Card disabled={true} style={styles.card}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
          </View>
          {message?.length > 0 && (
            <View style={styles.descriptionContainer}>
              <Text style={styles.description}>{message}</Text>
            </View>
          )}

          <View style={styles.buttonContainer}>
            <OutlineButton
              text="Delete"
              pressedOutput={() => handleUserDeletion(true)}
            />
            <Button
              text="Cancel"
              pressedOutput={() => handleUserDeletion(false)}
              disabled={false}
            />
          </View>
        </Card>
      </Modal>
    </View>
  );
};

const styles = StyleService.create({
  container: {
    height: '50%',
    width: 330,
    flex: 1,
    position: 'absolute',
    top: '25%',
    borderRadius: 30,
  },
  card: {
    paddingBottom: 10,
    borderRadius: 20,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  descriptionContainer: {
    paddingVertical: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    flexWrap: 'wrap',
    textAlign: 'center',
    color: Colors.default.primary,
    fontWeight: '400',
  },
  buttonContainer: {
    zIndex: 999,
    elevation: 999,
    marginTop: 20,
  },
  titleContainer: {
    paddingVertical: 10,
    textAlign: 'center',
  },
  title: {
    fontSize: 20,
    color: Colors.default.primary,
    flexWrap: 'wrap',
    textAlign: 'center',
    fontWeight: '600',
  },
});
