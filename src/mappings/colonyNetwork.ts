import { BigInt } from '@graphprotocol/graph-ts'

import {
  ColonyNetworkInitialised,
  TokenLockingAddressSet,
  MiningCycleResolverSet,
  NetworkFeeInverseSet,
  ColonyVersionAdded,
  MetaColonyCreated,
  ColonyAdded,
  SkillAdded,
  AuctionCreated,
  ReputationMiningInitialised,
  ReputationMiningCycleComplete,
  ReputationRootHashSet,
  UserLabelRegistered,
  ColonyLabelRegistered
} from '../../generated/ColonyNetwork/IColonyNetwork'

import { Colony, Domain, ColonyRoles, User, Skill } from '../../generated/schema'
import { Colony as ColonyTemplate } from '../../generated/templates'

export function handleColonyNetworkInitialised(
  event: ColonyNetworkInitialised
): void {}

export function handleTokenLockingAddressSet(
  event: TokenLockingAddressSet
): void {}

export function handleMiningCycleResolverSet(
  event: MiningCycleResolverSet
): void {}

export function handleNetworkFeeInverseSet(event: NetworkFeeInverseSet): void {}

export function handleColonyVersionAdded(event: ColonyVersionAdded): void {}

export function handleMetaColonyCreated(event: MetaColonyCreated): void {}

export function handleColonyAdded(event: ColonyAdded): void {
  // let creatorRoles = new ColonyRoles(event.params.colonyAddress.toHex() + '_1_' + event.transaction.from.toHex())
  // creatorRoles.user = event.transaction.from
  // creatorRoles.domain = event.params.colonyAddress.toHex() + '_1'
  // creatorRoles.administration = true
  // creatorRoles.timestamp = event.block.timestamp
  // creatorRoles.save()

  // let rootDomain = new Domain(event.params.colonyAddress.toHex() + '_1')
  // rootDomain.colonyAddress = event.params.colonyAddress
  // rootDomain.parent = event.params.colonyAddress
  // rootDomain.index = new BigInt(1)
  // rootDomain.timestamp = event.block.timestamp
  // rootDomain.save()

  let colony = new Colony(event.params.colonyAddress.toHex())
  colony.index = event.params.colonyId
  colony.token = event.params.token.toHex()
  colony.timestamp = event.block.timestamp
  colony.save()

  ColonyTemplate.create(event.params.colonyAddress)
}

export function handleSkillAdded(event: SkillAdded): void {
  let skill = new Skill(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  skill.skillId = event.params.skillId
  skill.parentSkillId = event.params.parentSkillId
  skill.timestamp = event.block.timestamp
  skill.save()
}

export function handleAuctionCreated(event: AuctionCreated): void {}

export function handleReputationMiningInitialised(
  event: ReputationMiningInitialised
): void {}

export function handleReputationMiningCycleComplete(
  event: ReputationMiningCycleComplete
): void {}

export function handleReputationRootHashSet(
  event: ReputationRootHashSet
): void {}

export function handleUserLabelRegistered(event: UserLabelRegistered): void {
  let user = User.load(event.params.user.toHex())
  if (!user) {
    user = new User(event.params.user.toHex())
  }
  user.ensName = event.params.label.toHex() // TODO: this is hash currently
  user.timestamp = event.block.timestamp
  user.save()
}

export function handleColonyLabelRegistered(
  event: ColonyLabelRegistered
): void {}
